import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import IphoneQuiz from '../pages/IphoneQuiz'; 
import { questions } from '../pages/IphoneQuiz';
import { useRouter } from 'next/router';

// Mock next/router
jest.mock('next/router', () => ({
    useRouter: jest.fn()
}));

describe('IphoneQuiz Component', () => {
    // Helper function to simulate answering questions
    const answerAllQuestionsCorrectly = (component) => {
        questions.forEach((question) => {
            const correctOption = question.answer;
            const buttons = screen.getAllByRole('button');
            const correctButton = buttons.find(button => button.textContent === correctOption);
            
            fireEvent.click(correctButton);
        });
    };

    beforeEach(() => {
        // Setup a mock implementation for useRouter
        useRouter.mockImplementation(() => ({
            push: jest.fn(),
            route: '/',
            pathname: '',
            query: '',
            asPath: '',
        }));
    });

    test('renders first question correctly', () => {
        render(<IphoneQuiz />);
        
        // Check if the first question is rendered
        expect(screen.getByText(/What is the function of the Home button on an iPhone\?/i)).toBeInTheDocument();
        
        // Check if all options are rendered
        const options = [
            "Take a photo",
            "Go to the home screen",
            "Adjust volume", 
            "Open the app switcher"
        ];
        options.forEach(option => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });

    test('handles correct answer progression', () => {
        render(<IphoneQuiz />);
        
        // Select the correct first answer
        const correctAnswer = screen.getByText('Go to the home screen');
        fireEvent.click(correctAnswer);
        
        // Check if the next question is rendered
        expect(screen.getByText(/Which gesture is used to unlock an iPhone\?/i)).toBeInTheDocument();
    });

    test('tracks incorrect answers', () => {
        render(<IphoneQuiz />);
        
        // Select an incorrect answer
        const incorrectAnswer = screen.getByText('Take a photo');
        fireEvent.click(incorrectAnswer);
        
        // Check for error message
        expect(screen.getByText('Incorrect! Please try again.')).toBeInTheDocument();
    });

    test('back to main page buttons work', () => {
        const mockPush = jest.fn();
        useRouter.mockImplementation(() => ({
            push: mockPush
        }));

        render(<IphoneQuiz />);

        // Click back to main page button
        const mainPageButton = screen.getByText('Back to Main Page');
        fireEvent.click(mainPageButton);
        
        // Verify router.push was called with correct path
        expect(mockPush).toHaveBeenCalledWith('/iphone');
    });
})