import styles from './CustomizableCard.module.css'
import { useState, useEffect } from 'react'

function CustomizableCard() {
    //Change to Backend__________________________________________
    const verses = [
        "Isaiah 53:5", "John 1:14", "John 14:6", "Romans 3:23",
        "Romans 5:12", "Romans 6:23", "John 19:11", "Romans 10:9",
        "John 14:26", "Matthew 25:13", "Revelation 1:7", "Isaiah 1:18",
        "Matthew 6:14", "Mark 11:25", "Matthew 4:4", "Exodus 15:2",
        "Psalm 150:6", "Philippians 4:4","John 14:6", "Romans 3:23",
        "Romans 8:28", "Philippians 4:13", "Jeremiah 29:11", "Isaiah 40:31",
        "Matthew 11:28", "Psalm 46:1", "Proverbs 16:9", "Matthew 19:26",
        "Acts 1:8", "Mark 9:23", "Luke 15:7", "John 15:12",
        "Galatians 2:20", "Galatians 6:7", "Colossians 3:23", "Colossians 3:2"
    ]
    let verseTemp = verses[Math.floor(Math.random() * verses.length)]
    let verseOfTheDay = verseTemp.split(" ");
    const [verse, setVerse] = useState("Loading...");
    const bookName = verseOfTheDay[0].toLowerCase();
    const chapterNumber = verseOfTheDay[1].split(":")[0];
    const verseNumber = verseOfTheDay[1].split(":")[1];

    const [stockData, setStockData] = useState({
        stockName: '',
        todayClose: 0,
        yesterdayClose: 0,
        percentChange: 0
    });

    function extractStockInfo({ meta, values }) {
        const stockName = meta.symbol; 
        const todayClose = parseFloat(values[0].close);
        const yesterdayClose = parseFloat(values[1].close);
        const percentChange = ((todayClose - yesterdayClose) / yesterdayClose * 100).toFixed(2);
        return { 
            stockName, 
            todayClose,
            yesterdayClose,
            percentChange
        };
    }

    async function getStockData() {
        const url = `https://api.twelvedata.com/time_series?symbol=SPY&interval=1day&apikey=f8ba3f2a72b349f39ab49ffb8d60e41d`;    
        const response = await fetch(url); 
        const data = await response.json(); 
        const stockInfo = extractStockInfo(data); 
        const stockDataWithTimestamp = {
            stockInfo,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(`stockData_SPY`, JSON.stringify(stockDataWithTimestamp)); 
        return stockInfo;
    }

    useEffect(() => {
        async function getData() {
            const stockInfo = await getStockData();
            if (stockInfo) {
                setStockData(stockInfo);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        fetch(
            `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-asv/books/${bookName}/chapters/${chapterNumber}/verses/${verseNumber}.json`
        )
            .then((response) => response.json())
            .then((data) => setVerse(data.text))
    }, []); 

    return (
        <div className={styles.card}>
            <h1>SPY 500 📊 </h1><hr></hr>
            <h2 className={styles.stock}>
                <span className={stockData.percentChange < 0 ? styles.negative : styles.positive}>
                    {stockData.percentChange}%
                </span> | ${stockData.todayClose.toFixed(2)}
            </h2>
            <h1 className={styles.header}>Daily Bible Verse 📖</h1>
            <h3 className={styles.quote}>
                {verseTemp} "{verse}"
            </h3>
        </div>
    );
}

export default CustomizableCard