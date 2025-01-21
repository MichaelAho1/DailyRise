import styles from './Selectors.module.css'
import { useNavigate } from 'react-router-dom' 

function Selectors() {
    const navigate = useNavigate(); 
    
    return(
        <div className={styles.selectors}>
            <button 
                className={styles.home}
                onClick={() => navigate('/home')} 
            >
                🏚️ Home
            </button>
            <button 
                className={styles.calender}
                onClick={() => navigate('/calender')} 
            >
                📆 Calender
            </button>
            <button 
                className={styles.settings}
                onClick={() => navigate('/settings')} 
            >
                ⚙️ Settings
            </button>
        </div>
    )
}

export default Selectors