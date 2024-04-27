import React, { useState, useEffect } from 'react'
import { Slider } from '../components/Slider'
import Lightbox from 'react-image-lightbox';
export default function GPSInNews() {
    const [newses, setNewses] = useState([]);
    const images = [
        'https://unsplash.com/photos/random',
        'https://unsplash.com/photos/random',
        'https://unsplash.com/photos/random'
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const openLightbox = (index) => {
        setIsOpen(true);
        setPhotoIndex(index);
    };
    useEffect(() => {
        const fetchNews = async () => {
            let response = await fetch("https://gpsakoli.ac.in/public/api/connection.php?gps-newses", {
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
            <div>
                {images.map((image, index) => (
                    <img
                        src={image}
                        alt=""
                        key={index}
                        onClick={() => openLightbox(index)}
                    />
                ))}
                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() =>
                            setPhotoIndex((photoIndex + images.length - 1) % images.length)
                        }
                        onMoveNextRequest={() =>
                            setPhotoIndex((photoIndex + 1) % images.length)
                        }
                    />
                )}
            </div>
            <div className="main-container">
                <div className="text-center">
                    <h1 className='heading'><span className='heading-red'>GPS </span>In News</h1>
                </div>
                <div className="card-container">
                    {newses.map(news => (

                        <div className="news-card" style={{ width: '300px' }}>
                            <div style={{ width: '300px', height: '300px' }}>
                                <img src={'https://gpsakoli.ac.in' + news.news_article_image} alt="" className='w-full h-full' style={{ objectFit: 'cover' }} />
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
