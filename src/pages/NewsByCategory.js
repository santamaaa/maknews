import '../assets/css/FilterNewsContent.css'
import Navbar from "../components/Navbar"
import { useState, useEffect, Suspense } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const NewsByCategory= () => {
    const [byCategory, setByCategory] = useState([])
    const { category } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNewsByCategory = async () => {
            setLoading(true)
            setByCategory([])
            
            try {
                const apiURL = process.env.REACT_APP_API_URL
                const apiKey = process.env.REACT_APP_API_KEY
                const response = await axios.get(`${apiURL}search?keywords=${category}&apiKey=${apiKey}`)
                setByCategory(response.data.news)
            } catch (error) {
                console.error("Error fetching the data: ", error)
            } finally {
                setLoading(false)
            }
        }

        fetchNewsByCategory()
    }, [category])

    const formatDate = (date) => {
        const format = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString(undefined, format)
    }

    const limitedText = (text) => {
        const viewPortWidth = window.innerWidth

        if (viewPortWidth > 600 && viewPortWidth <= 1100) {
            return text.slice(0, 80) + '...'
        } else {
            return text
        }
    }

    return (
        <div className="_content-filter">
            <div className="path">
                <a href="/">Back to Home</a>
                <p>/</p>
                <p>{ category }</p>
            </div>
            <Navbar />
            <h1>{ category } Today</h1>
            <div className="news-items">

                <Suspense fallback={<div className="not-available-loading">Loading . . .</div>}>
                    {
                        loading ? (
                            <div className="not-available-loading">Loading . . .</div>
                        ) : (
                            byCategory.length > 0 ? (
                                byCategory.map((news, index) => (
                                    <a href={ news.url } key={index} target="_blank" rel="noreferrer" className="news">
                                        <div className="news-img">
                                            <img src={ news.image } alt="" />
                                        </div>
                                        <div className="news-text">
                                            <p className="n-attribute">
                                                <span className="n-author">{ news.author }</span>
                                                <span className="line">|</span>
                                                <span className="n-date">{ formatDate(news.published) }</span>
                                            </p>
                                            <p className="n-title">{ limitedText(news.title) }</p>
                                            <p className="n-desc">{ limitedText(news.description) }</p>
                                        </div>
                                    </a>
                                ))
                            ) : (
                                <div className="not-available-loading">
                                    <p>News is not available</p>
                                </div>
                            )
                        )
                    }
                </Suspense>

            </div>
        </div>
    )
}

export default NewsByCategory