import { Link } from "react-router-dom"

import Container from "./Container"

import styles from './NavBar.module.css'
import logo from '../../imagens/Logo-Nav.png'

function NavBar(){
    return(
        <nav className={styles.navbar}>
            
                
                    <Link to='/'>
                        <img src={logo} alt='Costs' className={styles.logo}/>
                    </Link>
                
                <div className=
                {styles.menu}>
                    <Link className={styles.item} to='/'>Home</Link>
    
                    <Link className={styles.item} to='/projects'>Projeto</Link>
                    <Link className={styles.item} to='/company'>Empresa</Link>
                    <Link className={styles.item} to='/contact'>Contato</Link>
                </div>
            
        </nav>
    )
}
export default NavBar