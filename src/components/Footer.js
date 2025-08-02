import logo from '../assets/maknews.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faFacebook, faTiktok, faXTwitter, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <footer>
            <div className="_footer">
                <img src={ logo } alt="maknews-logo" />
                <div className="social-media">
                    <p>Follow MAKNEWS on :</p>
                    <div className="icon">
                        <a href="https://github.com/santamaaa">
                            <FontAwesomeIcon icon={ faInstagram } />
                        </a>
                        <a href="https://github.com/santamaaa">
                            <FontAwesomeIcon icon={ faFacebook } />
                        </a>
                        <a href="https://github.com/santamaaa">
                            <FontAwesomeIcon icon={ faTiktok } />
                        </a>
                        <a href="https://github.com/santamaaa">
                            <FontAwesomeIcon icon={ faXTwitter } />
                        </a>
                        <a href="https://github.com/santamaaa">
                            <FontAwesomeIcon icon={ faLinkedin } />
                        </a>
                        <a href="https://github.com/santamaaa">
                            <FontAwesomeIcon icon={ faYoutube } />
                        </a>
                    </div>
                </div>
                <p className="copyright">Copyright Santamaaa 2025</p>
            </div>
        </footer>
    )
}

export default Footer