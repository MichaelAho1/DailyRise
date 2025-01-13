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
                🏚️
            </button>
            <button 
                className={styles.calender}
                onClick={() => navigate('/calender')} 
            >
                📆
            </button>
            <button 
                className={styles.settings}
                onClick={() => navigate('/settings')} 
            >
                ⚙️
            </button>
        </div>
    )
}

export default Selectors