import { useEffect, useState } from 'react'
import '../assets/css/TodayNewsContent.css'
import axios from 'axios'
import Highlight from '../components/Highlight.js'
import Navbar from '../components/Navbar.js'

const TodayNews = () => {
    const [latestNews, setLatestNews] = useState([])

    useEffect(() => {
        const apiURL = process.env.REACT_APP_API_URL
        const apiKey = process.env.REACT_APP_API_KEY

        const fetchlatestNews = async () => {
            try {
                const response = await axios.get(`${apiURL}latest-news?apiKey=${apiKey}`)
                setLatestNews(response.data.news)
            } catch (error) {
                console.error("Error fetching the latest news:", error)
            }
        }

        fetchlatestNews()
    }, [])

    const formatDate = (date) => {
        const format = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString(undefined, format)
    }

    const formatCategory = (categories) => {
        return Array.isArray(categories) ? categories.join(' | ') : categories;
    }

    return (
        <div className="_content">
            <Highlight />
            <Navbar />
            <section>
                <div className="_today-news">
                    <h1>Today's News</h1>
                    <div className="news-items">
                        
                        {
                            latestNews.map((news, index) => (
                                <a href={ news.url } key={index} target="_blank" rel="noreferrer" className="news">
                                    <div className="news-img">
                                        <img src={ news.image } alt="" />
                                    </div>
                                    <div className="news-text">
                                        <p className="n-category">{ formatCategory(news.category) }</p>
                                        <div className="n-desc">
                                            <p className="n-attribute">
                                                <span className="n-author">{ news.author }</span>
                                                <span className="line">|</span>
                                                <span className="n-date">{ formatDate(news.published) }</span>
                                            </p>
                                            <p className="n-title">{ news.title }</p>
                                        </div>
                                    </div>
                                </a>
                            ))
                        }

                    </div>
                </div>
            </section>
        </div>
    )
}

export default TodayNews