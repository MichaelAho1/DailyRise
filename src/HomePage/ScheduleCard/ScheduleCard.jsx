import { useState } from 'react';
import styles from './ScheduleCard.module.css';
import { useNavigate } from "react-router-dom";
import { getCurrentDateMonth, getCurrentDay, getCurrentDateDay } from '../Date/Date.jsx';

export default function ScheduleCard() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState(["Sample Task at 12:00 AM (delete)"]);

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
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
                <button className={styles.footerButton} onClick={() => navigate("/calender")}>+</button>
            </div>
        </div>
    );
}
