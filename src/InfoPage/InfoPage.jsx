import { useState } from 'react';
import styles from './InfoPage.module.css';
import Selectors from '../Selectors/Selectors.jsx'

export default function InfoPage() {
    return (
        <>
            <Selectors></Selectors>
            <div className={styles.infoPage}>
                <h1>About MorningFlow</h1>
                <p>
                    MorningFlow was created to make morning routines quicker and easier by consolidating vital morning information. 
                    It provides live S&P 500 updates, morning Bible verses, daily news, and the day's weather forecast—all in one place. 
                    Instead of switching between multiple apps for these updates, users can simply open MorningFlow and get everything they need at a glance.
                </p>
                <h1>Contact Information</h1>
            </div>
        </>
    )
}