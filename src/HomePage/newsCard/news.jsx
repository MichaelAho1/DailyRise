import styles from './newsCard.module.css'
import React, { useEffect, useState } from "react";

export default function newsCard() {
    async function getNews() {
        const response1 =  await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=f6b1c5e7b71846ae902c483a30fe8885");
        const data1 = await response1.json();
        console.log(data1.articles[0])
    }
    useEffect(()=>{
        getNews();
    },[])
    return (
        <>
            <h1>fdafdsafsafsafsad</h1>
        </>
    )
}