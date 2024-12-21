import styles from './Date.module.css';
import React, { useEffect, useState } from 'react';

function DateComponent() {
    const [time, setTime] = useState(new Date());
    const day = time.toLocaleDateString('en-US', { weekday: 'long' });
    const date = time.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    return (
        <>  
            <h1 className={styles.time}>{day}, {date}</h1>
        </>
    );
}

export function getCurrentDay() {
    const date = new Date();
    return date.toLocaleDateString('en-US', { weekday: 'long' });
}

export function getCurrentDateDay() {
    const date = new Date();
    return date.toLocaleDateString('en-US', { day: 'numeric' });
}

export function getCurrentDateMonth() {
    const date = new Date();
    return date.toLocaleDateString('en-US', { month: 'long'});
}

export default DateComponent;