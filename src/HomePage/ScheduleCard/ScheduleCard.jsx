import { useState } from 'react';
import styles from './ScheduleCard.module.css';
import { getCurrentDateMonth, getCurrentDay, getCurrentDateDay } from '../Date/Date.jsx';
import deleteButton from './Images/deleteButton.png';

export default function ScheduleCard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState(["Sample Task"]);
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskTime, setNewTaskTime] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    
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
    
    const options = [
        `${getCurrentDay()}, ${getCurrentDateMonth()} ${getCurrentDateDay()}`,
        ...getNextDays()
    ];
    
    const toggleDropdown = () => setIsOpen(!isOpen);
    
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    function handleInputChange(event) {
        const value = event.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
        setNewTaskName(value);
    }

     function handleTimeChange(event) {
        const value = event.target.value;
        const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        
        if (value === '' || value.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3])(:[0-5]?[0-9]?)?$/)) {
            setNewTaskTime(value);
        }
    }

    function addTask() {
        const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        if (newTaskName.trim() !== "" && timeRegex.test(newTaskTime)) {
            const newTask = `${newTaskName} at ${newTaskTime}`;
            setTasks(currentTasks => {
                const updatedTasks = [...currentTasks, newTask];
                return updatedTasks.sort((a, b) => {
                    const timeA = a.split(' at ')[1];
                    const timeB = b.split(' at ')[1];
                    const [hoursA, minutesA] = timeA.split(':').map(Number);
                    const [hoursB, minutesB] = timeB.split(':').map(Number); 
                    const totalMinutesA = hoursA * 60 + minutesA;
                    const totalMinutesB = hoursB * 60 + minutesB;
                    return totalMinutesA - totalMinutesB;
                });
            });
            setNewTaskName("");
            setNewTaskTime("");
        } else {
            alert("Please enter a valid task name and time (HH:MM)");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.day}>Schedule For {getCurrentDay()}</h2>
            <div className={styles.listContainer}>
                <ol>
                    {tasks.map((task, index) => 
                        <li key={index}>
                            <span className="text">{task}</span>
                            <button
                               className={styles.deleteButton}
                               onClick={() => deleteTask(index)}>
                               <img 
                                   src={deleteButton} 
                                   alt="Delete" 
                                   className={styles.deleteIcon}
                               />
                           </button>
                        </li>
                    )}
                </ol>
            </div>
            <div className={styles.footer}>
                <p className={styles.footerText}>Earliest Task tomorrow: 9:15 A.M</p>
                <button className={styles.footerButton} onClick={toggleModal}>+</button>
            </div>

            {isModalOpen && (
                <div className={styles.modalBackdrop} onClick={toggleModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <button onClick={toggleModal} className={styles.modalButton}>x</button>
                        <h3>Add a New Task</h3>
                        <input 
                            type="text" 
                            placeholder="Task name"
                            value={newTaskName} 
                            onChange={handleInputChange}
                            className={styles.modalInput} 
                            maxLength={50} 
                        />
                        <input 
                            type="text" 
                            placeholder="Time Ex: 11:25"
                            value={newTaskTime} 
                            onChange={handleTimeChange}
                            className={styles.modalInput}
                            pattern="[0-9]{2}:[0-9]{2}"
                                maxLength={5}
                        />
                        <div className={styles.dropdownContainer}>
                            <button 
                                onClick={toggleDropdown}
                                className={styles.dropdownButton}
                            >
                                {selectedOption || "Select an option"}
                            </button>
                            {isOpen && (
                                <ul className={styles.dropdownMenu}>
                                    {options.map((option) => (
                                        <li 
                                            key={option} 
                                            onClick={() => handleOptionClick(option)}
                                            className={styles.dropdownItem}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button 
                            onClick={addTask} 
                            className={styles.addTaskButton}
                        >
                            Add Task
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
