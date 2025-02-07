import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Selectors.module.css";

function Selectors() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className={styles.selectors}>
            <button className={styles.about} onClick={() => navigate("/home")}>
                MorningFlow
            </button>
            <div className={styles.dropdown}>
                <button className={styles.menuButton} onClick={() => setDropdownOpen(!dropdownOpen)}>
                    Menu
                </button>
                {dropdownOpen && (
                    <div className={styles.dropdownContent}>
                        <button onClick={() => navigate("/home")}>Home</button>
                        <button onClick={() => navigate("/calender")}>Calendar</button>
                        <button onClick={() => navigate("/settings")}>Settings</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Selectors;