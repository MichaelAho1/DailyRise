import Selectors from '../Selectors/Selectors.jsx'
import Date from './Date/Date.jsx'
import WeatherCard from './WeatherCard/WeatherCard.jsx'
import ScheduleCard from './ScheduleCard/ScheduleCard.jsx'
import CustomizableCard from './CustomizableCard/CustomizableCard.jsx'

function Home() {
    return(
        <>
            <Selectors></Selectors>
            <Date></Date>
            <WeatherCard></WeatherCard>
            <ScheduleCard></ScheduleCard>
            <CustomizableCard></CustomizableCard>
        </>
    )
}

export default Home