import React, { useState, useEffect } from 'react'
import { Slider } from '../components/Slider'
export default function GPSInNews() {
    const [newses, setNewses] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            let response = await fetch("http://localhost:8012/public/api/connection.php?gps-newses", {
                method: "GET"
            });

            let data = await response.json();
            setNewses(data.data)
        }

        fetchNews();
    }, [])

    return (
        <>
            <Slider />
            <div className="main-container">
                <div className="text-center">
                    <h1 className='heading'><span className='heading-red'>GPS </span>In News</h1>
                </div>
                <div className="card-container">
                    {newses.map(news => (

                        <div className="news-card" style={{ width: '300px' }}>
                            <div style={{ width: '300px', height: '300px' }}>
                                <img src={'http://localhost:8012/public/' + news.news_article_image} alt="" className='w-full h-full' style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="date text-right">
                                {news.date_of_event}
                            </div>
                            <div className="card-content text-center">
                                {news.news_title.slice(0, 1).toUpperCase() + news.news_title.slice(1)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
