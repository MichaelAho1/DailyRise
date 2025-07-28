import styles from './newsCard.module.css';
import React, { useEffect, useState } from "react";

export default function NewsCard() {
    const [news, setNews] = useState([]);

    async function getNews() {
        try {
            const newsKey = import.meta.env.VITE_NEWS_KEY;
            const response = await fetch(`https://api.webz.io/newsApiLite?token=${newsKey}=stock market news`);
            const data = await response.json();
            const articles = data.posts?.filter(article => article).slice(0, 6) || [];
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
                        <div className={`${styles.imageContainer} ${!article.thread?.main_image ? styles.placeholderImage : ''}`}>
                            {article.thread?.main_image && (
                                <img 
                                    src={article.thread.main_image} 
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.classList.add(styles.placeholderImage);
                                    }}
                                />
                            )}
                        </div>
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