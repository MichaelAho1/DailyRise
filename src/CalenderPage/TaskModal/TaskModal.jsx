import { useState } from 'react';
import styles from './TaskModal.module.css';

export default function TaskModal({ toggleModal, addTask, selectedDate }) {
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

    function addTaskHandler() {
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
        addTask(newTaskName, newTaskTime, period);  

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
                <h3>Add Task for {selectedDate}</h3>
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
                    onClick={addTaskHandler} 
                    className={styles.addTaskButton}
                >
                    Add Task
                </button>
            </div>
        </div>
    );
}
