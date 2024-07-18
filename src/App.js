import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header.js'
import TodayNews from './pages/TodayNews.js'
import NewsByCategory from './pages/NewsByCategory.js'
import NewsByRegion from './pages/NewsByRegion.js'
import NewsBySearch from './pages/NewsBySearch.js'
import Footer from './components/Footer.js'
import ScrollToTop from './components/ScrollToTop.js'

function App() {
  return (
    <div className="app">
      <div className="app-content">
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={ <TodayNews /> } />
            <Route path="/region/:region" element={ <NewsByRegion /> } />
            <Route path="/category/:category" element={ <NewsByCategory /> } />
            <Route path="/search/:query" element={ <NewsBySearch /> } />
          </Routes>
        </Router>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  )
}

export default App