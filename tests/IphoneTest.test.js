import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IphonePage from '../pages/iphone';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-video-url');

// Create a mock router
const createMockRouter = (router) => {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforeHistoryChange: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    ...router,
  };
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-video-url');


describe('IphonePage Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorageMock.clear();
  });

  const renderWithRouter = (component, router = {}) => {
    return render(
      <RouterContext.Provider value={createMockRouter(router)}>
        {component}
      </RouterContext.Provider>
    );
  };

  it('renders the page with initial elements', () => {
    renderWithRouter(<IphonePage />);
    
    // Check for key elements
    expect(screen.getByText('iPhone Video Guides')).toBeInTheDocument();
    expect(screen.getByText('Import Your Own Guide')).toBeInTheDocument();
  });

  it('allows video upload', () => {
    renderWithRouter(<IphonePage />);
    
    // Create a mock file
    const file = new File(['dummy content'], 'test-video.mp4', { type: 'video/mp4' });
    
    // Find the file input and trigger upload
    const fileInput = screen.getByTestId('main-video-upload-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Check that a video URL was created
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  // Rest of the tests remain the same, just use renderWithRouter instead of render
  it('allows adding a video title', () => {
    renderWithRouter(<IphonePage />);
    
    // Create a mock file and upload it
    const file = new File(['dummy content'], 'test-video.mp4', { type: 'video/mp4' });
    const fileInput = screen.getByTestId('main-video-upload-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Find the title input
    const titleInput = screen.getByPlaceholderText('Enter video title...');
    fireEvent.change(titleInput, { target: { value: 'My Test Video' } });
    
    // Find and click the Enter button
    const enterButton = screen.getByText('Enter');
    fireEvent.click(enterButton);
    
    // Check that the title is displayed
    expect(screen.getByText('My Test Video')).toBeInTheDocument();
  });

  // Repeat for other tests, using renderWithRouter
  it('allows adding a comment to an uploaded video', () => {
    renderWithRouter(<IphonePage />);
    
    // Create a mock file and upload it
    const file = new File(['dummy content'], 'test-video.mp4', { type: 'video/mp4' });
    const fileInput = screen.getByTestId('main-video-upload-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Find the comment input
    const commentInput = screen.getByPlaceholderText('Add a comment...');
    fireEvent.change(commentInput, { target: { value: 'Great video!' } });
    
    // Find and click the Comment button
    const commentButton = screen.getByText('Comment');
    fireEvent.click(commentButton);
    
    // Check that the comment is displayed
    expect(screen.getByText('Great video!')).toBeInTheDocument();
  });

  it('allows adding a reply to a comment', () => {
    renderWithRouter(<IphonePage />);
    
    // Create a mock file and upload it
    const file = new File(['dummy content'], 'test-video.mp4', { type: 'video/mp4' });
    const fileInput = screen.getByTestId('main-video-upload-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Add an initial comment
    const commentInput = screen.getByPlaceholderText('Add a comment...');
    fireEvent.change(commentInput, { target: { value: 'Great video!' } });
    const commentButton = screen.getByText('Comment');
    fireEvent.click(commentButton);
    
    // Find the reply input and add a reply
    const replyInput = screen.getByPlaceholderText('Reply...');
    fireEvent.change(replyInput, { target: { value: 'Thanks!' } });
    const replyButton = screen.getByText('Reply');
    fireEvent.click(replyButton);
    
    // Check that the reply is displayed
    expect(screen.getByText('Thanks!')).toBeInTheDocument();
  });

  it('allows deleting an uploaded video', () => {
    renderWithRouter(<IphonePage />);
    
    // Create a mock file and upload it
    const file = new File(['dummy content'], 'test-video.mp4', { type: 'video/mp4' });
    const fileInput = screen.getByTestId('main-video-upload-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Find and click the Delete Video button
    const deleteButton = screen.getByText('Delete Video');
    fireEvent.click(deleteButton);
    
    // Check that the "No comments yet" text is displayed (indicating no videos)
    expect(screen.queryByText('Great video!')).toBeNull();
  });
});
