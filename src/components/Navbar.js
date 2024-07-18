import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [menuVisible, setMenuVisible] = useState(false)
    const [iconChange, setIconChange] = useState(faBars)
    const [regions, setRegions] = useState([])
    const [categories, setCategories] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const navRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        const apiURL = process.env.REACT_APP_API_URL
        const apiKey = process.env.REACT_APP_API_KEY

        const fetchData = async () => {
            try {
                const responseCategories = await axios.get(`${apiURL}available/categories?apiKey=${apiKey}`)
                setCategories(responseCategories.data.categories)

                const responseRegions = await axios.get(`${apiURL}available/regions?apiKey=${apiKey}`)
                const getRegions = responseRegions.data.regions
                const regionsData = Object.entries(getRegions)
                    .map(([name, code]) => ({name, code}))
                    .sort((a, b) => a.name.localeCompare(b.name))
                setRegions(regionsData)
            } catch (error) {
                console.log("Error fetching the data:", error)
            }
        }

        fetchData()
    }, [])

    const showMenu = () => {
        setMenuVisible(!menuVisible)
        setIconChange(menuVisible ? faBars : faXmark)
        
        if (navRef.current) {
            navRef.current.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }

    const hideMenu = () => {
        setMenuVisible(false)
        setIconChange(faBars)

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const buttonMenuStyle = {
        backgroundColor: menuVisible ? 'var(--grey4)' : 'var(--grey1)',
        color: menuVisible ? 'var(--grey1)' : 'var(--grey4)'
    }

    const menuStyle = {
        display: menuVisible ? 'grid' : 'none',
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/search/${searchQuery}`)
        }
    }

    return (
        <nav ref={ navRef }>
            <div className="_nav">
                <div className="nav-menu">
                    <button onClick={ showMenu } style={ buttonMenuStyle }>
                        <FontAwesomeIcon icon={ iconChange } />
                    </button>
                </div>
                <form onSubmit={handleSearch} className="search-bar">
                    <input
                        type="text"
                        placeholder="Search MAKNEWS . . ."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
            </div>
            <div className="_nav-list" style={ menuStyle }>
                <div className="region">
                    {
                        regions.map((region, index) => (
                            <Link to={`/region/${region.name}`} key={ index } onClick={ hideMenu }>{ region.name }</Link>
                        ))
                    }
                </div>
                <div className="category">
                    {
                        categories.map((category, index) => (
                            <Link to={`/category/${category}`} key={ index } onClick={ hideMenu }>{ category }</Link>
                        ))
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar