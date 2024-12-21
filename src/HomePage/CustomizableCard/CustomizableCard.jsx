import styles from './CustomizableCard.module.css'
import { useState, useEffect } from 'react'

function CustomizableCard() {
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

    const [verse, setVerse] = useState("");
    useEffect(() => {
        fetch(
            "https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-kjv/books/john/chapters/3/verses/16.json"
        )
            .then((response) => response.json())
            .then((data) => setVerse(data.text))
            .catch((error) => console.error("Error fetching verse:", error));
    }, []); 


    return (
        <div className={styles.card}>
            <h2 className={styles.stock}>
                S&P 500: <span className={stockData.percentChange < 0 ? styles.negative : styles.positive}>
                    {stockData.percentChange}% 
                </span> | {stockData.todayClose.toFixed(2)}$
            </h2>
            <h1 className={styles.header}>Bible Verse of the Day</h1>
            <h3 className={styles.quote}>
                "{verse}"
            </h3>
        </div>
    );
    
}

export default CustomizableCard