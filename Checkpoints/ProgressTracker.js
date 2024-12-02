import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import './ProgressTracker.css';

const ProgressTracker = ({ tasks = [] }) => {
    const [checkedTasks, setCheckedTasks] = useState(new Array(tasks.length).fill(false));
    const router = useRouter();

    const handleCheck = (index) => {
        const updatedCheckedTasks = [...checkedTasks];
        updatedCheckedTasks[index] = !updatedCheckedTasks[index];
        setCheckedTasks(updatedCheckedTasks);
    };

    const handleQuizButton = () => {
        if (checkedTasks.every(checked => checked)) {
            router.push('/IphoneQuiz');
        } else {
            alert("Please complete all tasks to proceed!");
        }
    };

    return (
        <div className="progress-tracker">
            <h2>Progress Tracker</h2>
            {tasks.map((task, index) => (
                <div key={index} className={`task ${checkedTasks[index] ? 'completed' : ''}`}>
                    <input
                        type="checkbox"
                        checked={checkedTasks[index]}
                        onChange={() => handleCheck(index)}
                    />
                    <span>{task}</span>
                    <span className="task-indicator">⭐</span>
                </div>
            ))}
            {checkedTasks.every(checked => checked) && (
                <>
                    <p className="completion-message">Simple Questions for iPhone Starter</p>
                    <button className="quiz-button" onClick={handleQuizButton}>
                        Quiz
                    </button>
                </>
            )}
        </div>
    );
};

export default ProgressTracker;
