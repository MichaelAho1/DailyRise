import { useState } from 'react';
import styles from './ScheduleCard.module.css';
import { getCurrentDay } from '../Date/Date.jsx';

export default function ScheduleCard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([{
        name: "Sample Task",
        time: "9:00 AM",
        date: getNextDays()[0] 
    }]);
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskTime, setNewTaskTime] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(getNextDays()[0]); 
    const [isAMButtonDisabled, setIsAMButtonDisabled] = useState(false);
    const [isPMButtonDisabled, setIsPMButtonDisabled] = useState(false);

    function getNextDays() {
        const days = [];
        const today = new Date();
        
        for (let i = 0; i <= 6; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            const dayName = nextDay.toLocaleDateString('en-US', { weekday: 'long' });
            const month = nextDay.toLocaleDateString('en-US', { month: 'long' });
            const date = nextDay.getDate();
            days.push(`${dayName}, ${month} ${date}`);
        }
        
        return days;
    }

    const options = getNextDays();

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function handleOptionClick(option) {
        setSelectedOption(option);
        setIsOpen(false);
    }

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
        if (!selectedOption) {
            alert("Please select a Date.");
            return;
        }
        if (!isAMButtonDisabled && !isPMButtonDisabled) {
            alert("Please select either AM or PM.");
            return;
        }
        if (!newTaskName.trim()) {
            alert("Please enter a name for the task.");
            return;
        }
        if (/^(0?[1-9]|1[0-2]):[0-5][0-9]$/.test(newTaskTime)) {
            const period = isAMButtonDisabled ? "AM" : "PM";
            const newTask = { name: newTaskName, time: `${newTaskTime} ${period}`, date: selectedOption };
            setTasks([...tasks, newTask]);
            setNewTaskName("");
            setNewTaskTime("");
            setIsAMButtonDisabled(false);
            setIsPMButtonDisabled(false);
        } else {
            alert("Please enter a valid task time. (Ex. 12:35)");
        }
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function toggleModal() {
        setIsModalOpen(!isModalOpen);
    }

    function toggleAMButton() {
        setIsAMButtonDisabled(true);
        setIsPMButtonDisabled(false);
    }

    function togglePMButton() {
        setIsPMButtonDisabled(true);
        setIsAMButtonDisabled(false);
    }

    const filteredTasks = tasks.filter(task => task.date === selectedOption);
    
    const nextDayIndex = options.indexOf(selectedOption) + 1;
    const nextDayTasks = tasks.filter(task => task.date === options[nextDayIndex]);
    const earliestTask = nextDayTasks.sort((a, b) => {
        const [timeA, periodA] = a.time.split(' ');
        const [timeB, periodB] = b.time.split(' ');

        const [hoursA, minutesA] = timeA.split(':').map(Number);
        const [hoursB, minutesB] = timeB.split(':').map(Number);

        const totalMinutesA = ((periodA === 'PM' && hoursA !== 12) ? hoursA + 12 : (periodA === 'AM' && hoursA === 12) ? 0 : hoursA) * 60 + minutesA;
        const totalMinutesB = ((periodB === 'PM' && hoursB !== 12) ? hoursB + 12 : (periodB === 'AM' && hoursB === 12) ? 0 : hoursB) * 60 + minutesB;

        return totalMinutesA - totalMinutesB;
    })[0];

    return (
        <div className={styles.card}>
            <div className={styles.headerSection}>
                <h2 className={styles.day}>📅 Schedule For {selectedOption || getCurrentDay()}</h2>
                <div className={styles.dropdownContainer}>
                    <button onClick={toggleDropdown} className={styles.dropdownButton}>
                        📅 {selectedOption || "Select Date"}
                    </button>
                    {isOpen && (
                        <ul className={styles.dropdownMenu}>
                            {options.map((option) => (
                                <li key={option} onClick={() => handleOptionClick(option)} className={styles.dropdownItem}>
                                    📅 {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className={styles.listContainer}>
                <ol>
                    {filteredTasks.map((task, index) => 
                        <li key={index}>
                            <span className="text">📝 {task.name} at {task.time}</span>
                            <button className={styles.deleteButton} onClick={() => deleteTask(index)}>🗑️</button>
                        </li>
                    )}
                </ol>
            </div>

            <div className={styles.footer}>
                <p className={styles.footerText}>⏰ Earliest Task (Next Day): {earliestTask ? `${earliestTask.name} at ${earliestTask.time}` : "No tasks"}</p>
                <button className={styles.footerButton} onClick={toggleModal}>+</button>
            </div>

            {isModalOpen && (
                <div className={styles.modalBackdrop} onClick={toggleModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <button onClick={toggleModal} className={styles.modalButton}>×</button>
                        <h3>Add a New Task</h3>
                        <input type="text" placeholder="Task name" value={newTaskName} onChange={handleInputChange} className={styles.textInput} maxLength={50} />
                        <div className={styles.timeLine}>
                            <input type="text" placeholder="Time" value={newTaskTime} onChange={handleTimeChange} className={styles.time} maxLength={5} />
                            <button disabled={isAMButtonDisabled} className={styles.AMButton} onClick={toggleAMButton}>🌅 AM</button>
                            <button disabled={isPMButtonDisabled} className={styles.PMButton} onClick={togglePMButton}>🌙 PM</button>
                        </div>
                        <button onClick={addTask} className={styles.addTaskButton}>Add Task</button>
                    </div>
                </div>
            )}
        </div>
    );
}
