import { useState } from 'react';
import styles from './TaskModal.module.css';

export default function TaskModal({ toggleModal, setTasks, tasks }) {
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskTime, setNewTaskTime] = useState("");
    const [isAMButtonDisabled, setIsAMButtonDisabled] = useState(false);
    const [isPMButtonDisabled, setIsPMButtonDisabled] = useState(false);

    function handleInputChange(event) {
        const value = event.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
        setNewTaskName(value);
    }

    function handleTimeChange(event) {
        const value = event.target.value;
        if (value === '' || value.match(/^(0?[1-9]|1[0-2])(:[0-5]?[0-9]?)?$/)) {
            setNewTaskTime(value);
        }
    }

    function addTask() {
        if (newTaskName.trim() === "") {
            alert("Please enter a name for the task.");
            return;
        }
        if (!isAMButtonDisabled && !isPMButtonDisabled) {
            alert("Please select either AM or PM.");
            return;
        }
        const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
        if (!timeRegex.test(newTaskTime)) {
            alert("Please enter a valid task time. (Ex. 12:35)");
            return;
        }
        
        const period = isAMButtonDisabled ? "AM" : "PM";
        const newTask = `${newTaskName} at ${newTaskTime} ${period}`;
        setTasks([...tasks, newTask]);
        
        setNewTaskName("");
        setNewTaskTime("");
        setIsAMButtonDisabled(false);
        setIsPMButtonDisabled(false);
        toggleModal();
    }

    return (
        <div className={styles.modalBackdrop} onClick={toggleModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button onClick={toggleModal} className={styles.modalButton}>×</button>
                <h3>Add a New Task</h3>
                <input 
                    type="text" 
                    placeholder="Task name"
                    value={newTaskName} 
                    onChange={handleInputChange}
                    className={styles.textInput} 
                    maxLength={50} 
                />
                <div className={styles.timeLine}>
                    <input 
                        type="text" 
                        placeholder="Time"
                        value={newTaskTime} 
                        onChange={handleTimeChange}
                        className={styles.time}
                        maxLength={5}
                    />
                    <button
                        disabled={isAMButtonDisabled} 
                        className={styles.AMButton}
                        onClick={() => {
                            setIsAMButtonDisabled(true);
                            setIsPMButtonDisabled(false);
                        }}
                    >
                        🌅 AM
                    </button>
                    <button
                        disabled={isPMButtonDisabled} 
                        className={styles.PMButton}
                        onClick={() => {
                            setIsPMButtonDisabled(true);
                            setIsAMButtonDisabled(false);
                        }}
                    >
                        🌙 PM
                    </button>
                </div>
                <button 
                    onClick={addTask} 
                    className={styles.addTaskButton}
                >
                    Add Task
                </button>
            </div>
        </div>
    );
}


/**
 * <div className={styles.dropdownContainer}>
<button 
    onClick={toggleDropdown}
    className={styles.dropdownButton}
>
    📅 {selectedOption || "Select Date"}
</button>
{isOpen && (
    <ul className={styles.dropdownMenu}>
        {options.map((option) => (
            <li 
                key={option} 
                onClick={() => handleOptionClick(option)}
                className={styles.dropdownItem}
            >
                📅 {option}
            </li>
        ))}
    </ul>
)}

    const addTaskDay = () => {
        const date = selectedOption.split(" ");
        setTaskDay(date[2]);
        setTaskMonth(date[1]);
        setWeekDay(date[0].replace(/,/g, ""));
    }
    
    const getNextDays = () => {
        const days = [];
        const today = new Date();
        
        for(let i = 1; i <= 6; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            const dayName = nextDay.toLocaleDateString('en-US', { weekday: 'long' });
            const month = nextDay.toLocaleDateString('en-US', { month: 'long' });
            const date = nextDay.getDate();
            days.push(`${dayName}, ${month} ${date}`);
        }
        
        return days;
    };

        const addTaskDay = () => {
        const date = selectedOption.split(" ");
        setTaskDay(date[2]);
        setTaskMonth(date[1]);
        setWeekDay(date[0].replace(/,/g, ""));
    }

        const [selectedOption, setSelectedOption] = useState(null);
 */
