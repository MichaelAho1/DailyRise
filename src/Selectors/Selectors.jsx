import styles from './Selectors.module.css'
import homeIcon from './images/homeButton.png'
import calenderIcon from './images/calenderButton.png'
import settingsIcon from './images/settingsButton.png'
import { useNavigate } from 'react-router-dom' 

function Selectors() {
    const navigate = useNavigate(); 
    
    return(
        <div className={styles.selectors}>
            <button 
                className={styles.home}
                onClick={() => navigate('/home')} 
            >
                <img src={homeIcon} alt="Home" />
            </button>
            <button 
                className={styles.calender}
                onClick={() => navigate('/calender')} 
            >
                <img src={calenderIcon} alt="Calender" />
            </button>
            <button 
                className={styles.settings}
                onClick={() => navigate('/settings')} 
            >
                <img src={settingsIcon} alt="Settings" />
            </button>
        </div>
    )
}

export default Selectors