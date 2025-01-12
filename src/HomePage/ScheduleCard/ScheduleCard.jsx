import { useState } from 'react';
import styles from './ScheduleCard.module.css';
import { getCurrentDateMonth, getCurrentDay, getCurrentDateDay } from '../Date/Date.jsx';

export default function ScheduleCard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState(["Sample Task at 12:00 AM (delete)"]);
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskTime, setNewTaskTime] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAMButtonDisabled, setIsAMButtonDisabled] = useState (false);
    const [isPMButtonDisabled, setIsPMButtonDisabled] = useState (false);
    const [taskDay, setTaskDay] = useState("");
    const [taskMonth, setTaskMonth] = useState("");
    const [weekDay, setWeekDay] = useState("");

    // USE THIS WHEN U DO THE BACKEND_______________________________________________________________________________________________
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
        const timeRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])?$/;
        
        if (value === '' || value.match(/^(0?[1-9]|1[0-2])(:[0-5]?[0-9]?)?$/)) {
            setNewTaskTime(value);
        }
    }

    function addTask() {
        addTaskDay();
        const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
        if (!isAMButtonDisabled && !isPMButtonDisabled) {
            alert("Please select either AM or PM");
            return;
        }
        if (newTaskName.trim() !== "" && timeRegex.test(newTaskTime)) {
            const period = isAMButtonDisabled ? "AM" : "PM";
            const newTask = `${newTaskName} at ${newTaskTime} ${period}`;
            setTasks(currentTasks => {
                const updatedTasks = [...currentTasks, newTask];
                return updatedTasks.sort((a, b) => {
                    const [timeA, periodA] = a.split(' at ')[1].split(' ');
                    const [timeB, periodB] = b.split(' at ')[1].split(' ');
                        
                    const [hoursA, minutesA] = timeA.split(':').map(Number);
                    const [hoursB, minutesB] = timeB.split(':').map(Number);
                        
                    const totalMinutesA = (
                        ((periodA === 'PM' && hoursA !== 12) ? hoursA + 12 : 
                        (periodA === 'AM' && hoursA === 12) ? 0 : hoursA) * 60
                    ) + minutesA;
                        
                    const totalMinutesB = (
                        ((periodB === 'PM' && hoursB !== 12) ? hoursB + 12 : 
                        (periodB === 'AM' && hoursB === 12) ? 0 : hoursB) * 60
                    ) + minutesB;
                        
                    return totalMinutesA - totalMinutesB;
                });
            });
            setNewTaskName("");
            setNewTaskTime("");
            setIsAMButtonDisabled(false);
            setIsPMButtonDisabled(false);
        } else {
            alert("Please enter a valid task name.");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleAMButton = () => {
        setIsAMButtonDisabled(true);
        setIsPMButtonDisabled(false);
    }

    const togglePMButton = () => {
        setIsPMButtonDisabled(true);
        setIsAMButtonDisabled(false);
    }



    return (
        <div className={styles.card}>
            <h2 className={styles.day}>📅 Schedule For {getCurrentDay()}</h2>
            <div className={styles.listContainer}>
                <ol>
                    {tasks.map((task, index) => 
                        <li key={index}>
                            <span className="text">📝 {task}</span>
                            <button
                                className={styles.deleteButton}
                                onClick={() => deleteTask(index)}>
                                🗑️
                            </button>
                        </li>
                    )}
                </ol>
            </div>
            <div className={styles.footer}>
                <p className={styles.footerText}>⏰ Earliest Task tomorrow: 9:15 A.M</p>
                <button className={styles.footerButton} onClick={toggleModal}>+</button>
            </div>

            {isModalOpen && (
                <div className={styles.modalBackdrop} onClick={toggleModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <button onClick={toggleModal} className={styles.modalButton}>×</button>
                        <h3>✨ Add a New Task</h3>
                        <input 
                            type="text" 
                            placeholder="✏️ Task name"
                            value={newTaskName} 
                            onChange={handleInputChange}
                            className={styles.textInput} 
                            maxLength={50} 
                        />
                        <div className={styles.timeLine}>
                            <input 
                                type="text" 
                                placeholder="⏰ Time"
                                value={newTaskTime} 
                                onChange={handleTimeChange}
                                className={styles.time}
                                pattern="[0-9]{2}:[0-9]{2}"
                                maxLength={5}
                            />
                            <button
                                disabled={isAMButtonDisabled} 
                                className={styles.AMButton}
                                onClick={toggleAMButton}
                            >
                                🌅 AM
                            </button>
                            <button
                                disabled={isPMButtonDisabled} 
                                className={styles.PMButton}
                                onClick={togglePMButton}
                            >
                                🌙 PM
                            </button>
                        </div>
                        <div className={styles.dropdownContainer}>
                            <button 
                                onClick={toggleDropdown}
                                className={styles.dropdownButton}
                            >
                                📅 {selectedOption || "Select Day"}
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
                        </div>
                        <button 
                            onClick={addTask} 
                            className={styles.addTaskButton}
                        >
                            ✅ Add Task
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
