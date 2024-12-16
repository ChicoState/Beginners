import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../page';
import '@testing-library/jest-dom'; // For extended matchers

// Mock the Search component and other child components to focus on the HomePage behavior
jest.mock('../components/Searchbar/Search', () => ({
  __esModule: true,
  default: ({ onSearchResults }) => {
    return (
      <div>
        {/* Placeholder for the search input and button */}
        <input placeholder="Search topics..." />
        <button onClick={() => onSearchResults({
          searchResults: [{ id: 1, title: 'React' }],
          learningSteps: ['Step 1: Install React', 'Step 2: Learn JSX'],
          isFromCache: false,
          formattedQuery: 'react',
          currentQuery: 'React',
          hasSearched: true,
        })}>
          Search
        </button>
      </div>
    );
  },
}));

jest.mock('../components/TopicsGrid', () => ({
  __esModule: true,
  default: ({ searchResults }) => (
    <div data-testid="topics-grid">{searchResults.length > 0 ? 'Results found' : 'No results'}</div>
  ),
}));

jest.mock('../components/LearningSteps', () => ({
  __esModule: true,
  default: ({ learningSteps, isFromCache, searchQuery, isLoading }) => (
    <div data-testid="learning-steps">
      {learningSteps ? (
        <div>{learningSteps.join(', ')}</div>
      ) : (
        'No learning steps available'
      )}
    </div>
  ),
}));

jest.mock('../components/ExpertCard', () => ({
  __esModule: true,
  default: ({ topic }) => <div data-testid="expert-card">Expert for {topic}</div>,
}));

describe('HomePage', () => {
  it('renders the page correctly', () => {
    render(<HomePage />);

    // Check if the title and description are rendered
    expect(screen.getByText(/Learn Anything/i)).toBeInTheDocument();
    expect(screen.getByText(/Your personal AI-powered learning companion/i)).toBeInTheDocument();
  });

  it('displays search results after searching', async () => {
    render(<HomePage />);

    // Interact with the mocked Search component
    fireEvent.change(screen.getByPlaceholderText('Search topics...'), {
      target: { value: 'React' },
    });
    fireEvent.click(screen.getByText('Search'));

    // Wait for the results to appear
    await waitFor(() => screen.getByText('Results found'));

    // Check if the search results appear
    expect(screen.getByTestId('topics-grid')).toHaveTextContent('Results found');
    expect(screen.getByTestId('learning-steps')).toHaveTextContent('Step 1: Install React, Step 2: Learn JSX');
    expect(screen.getByTestId('expert-card')).toHaveTextContent('Expert for React');
  });

  it('displays learning steps only after a search', async () => {
    render(<HomePage />);

    // Initially, no learning steps should be displayed
    expect(screen.queryByTestId('learning-steps')).not.toBeInTheDocument();

    // Trigger the search
    fireEvent.change(screen.getByPlaceholderText('Search topics...'), {
      target: { value: 'React' },
    });
    fireEvent.click(screen.getByText('Search'));

    // Wait for the learning steps to appear
    await waitFor(() => screen.getByTestId('learning-steps'));

    // Check if learning steps are now displayed
    expect(screen.getByTestId('learning-steps')).toBeInTheDocument();
  });
});
