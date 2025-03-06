import React from 'react';
import styles from './WarningModal.module.css';

const WarningModal = ({ onContinue, onBack }) => {
    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
                <h2>Warning</h2>
                <p>This section is not yet implemented.</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.backButton} onClick={onBack}>
                        Go Back
                    </button>
                    <button className={styles.continueButton} onClick={onContinue}>
                        Continue Anyway
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WarningModal; 