import { useState, useEffect } from 'react'
import logo from '../assets/maknews.png'

const Header = () => {
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, [])

    const time = (date) => {
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
    }

    const date = (date) => {
        const formatDate = {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }
        return date.toLocaleDateString('en-GB', formatDate)
    }

    return (
        <header>
            <div className="_header">
                <img className="h-logo" src={ logo } alt="maknews-logo" />
                <p className="h-time">
                    <span className="time">{ time(currentTime) }</span>
                    <span className="line">|</span>
                    <span className="date">{ date(currentTime) }</span>
                </p>
            </div>
        </header>
    )
}

export default Header