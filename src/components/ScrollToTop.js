import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"

const ScrollToTop = () => {
    const [toTopVisible, setToTopVisible] = useState(false)

    const toggleScrollToTop = () => {
        if (window.pageYOffset > 200) {
            setToTopVisible(true)
        } else {
            setToTopVisible(false)
        }
    }

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleScrollToTop)
        return () => {
            window.removeEventListener('scroll', toggleScrollToTop)
        }
    }, [])

    return (
        <div className="_scroll-to-top">

            {
                toTopVisible &&
                <button onClick={ handleScrollToTop }>
                    <FontAwesomeIcon icon={ faArrowUp } />
                </button>
            }
            
        </div>
    )
}

export default ScrollToTop