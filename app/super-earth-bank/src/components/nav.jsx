import Styles from '../styles/nav.module.css'
import Logo from '../assets/logo.webp'
import { FaPlaystation } from "react-icons/fa";

export function Nav () {
  return (
    <nav className={Styles.container}>
      <img src={Logo} alt='logo' width={50} />
      <ul className={Styles.listNavigation}>
        <li>HOME</li>
        <li>NEWS</li>
        <li>BENEFITS</li>
        <li>REFER A FRIEND</li>
        <li>SUPPORT</li>
      </ul>
      <FaPlaystation style={{ color: 'white', fontSize: '1.75rem'}} />
    </nav>
  )
}