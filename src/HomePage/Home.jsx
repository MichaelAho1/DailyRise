import Navbar from '../Navbar/Navbar.jsx'
import NewsCard from './newsCard/news.jsx'
import WeatherCard from './WeatherCard/WeatherCard.jsx'
import ScheduleCard from './ScheduleCard/ScheduleCard.jsx'
import CustomizableCard from './CustomizableCard/CustomizableCard.jsx'
import styles from './home.module.css'

function Home() {
    return(
        <>
            <Navbar></Navbar>
            <div className={styles.topSection}>
                <WeatherCard></WeatherCard>
                <CustomizableCard></CustomizableCard>
            </div>
            <NewsCard></NewsCard>
            <ScheduleCard></ScheduleCard>
        </>
    )
}

export default Home