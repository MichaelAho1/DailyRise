import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calender/calender';
import WarningModal from './WarningModal/WarningModal';
import Selectors from '../Selectors/Selectors.jsx'

const CalenderSection = () => {
    const [showWarning, setShowWarning] = useState(true);
    const navigate = useNavigate();

    const handleContinue = () => {
        setShowWarning(false);
    };

    const handleBack = () => {
        navigate('/home');
    };

    return (
        <>
            {showWarning && (
                <WarningModal 
                    onContinue={handleContinue}
                    onBack={handleBack}
                />
            )}
            <Selectors></Selectors>
            <Calendar />
        </>
    );
};

export default CalenderSection;