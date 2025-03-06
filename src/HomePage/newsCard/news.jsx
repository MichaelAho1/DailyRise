import styles from './newsCard.module.css';
import React, { useEffect, useState } from "react";

export default function NewsCard() {
    const [news, setNews] = useState([]);

    async function getNews() {
        try {
            const newsKey = '0'//'3f628023-0c18-4fd9-a790-0c54ddda85e0&q';
            const response = await fetch(`https://api.webz.io/newsApiLite?token=${newsKey}=stock market news`);
            const data = await response.json();
            const articles = data.posts?.filter(article => article.thread?.main_image).slice(0, 6) || [];
            setNews(articles);
        } catch (error) {
            console.error('Error fetching news:', error);
            setNews([]);
        }
    }   

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className={styles.card}>
            <h1 className={styles.header}>News for {new Date().toLocaleDateString('en-US', { weekday: 'long' })}</h1>
            <div className={styles.newsGrid}>
                {news.map((article, index) => (
                    <div key={index} className={styles.newsItem}>
                        <img 
                            src={article.thread.main_image} 
                            alt={article.title} 
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <div className={styles.textContent}>
                            <h2>{article.title}</h2>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}