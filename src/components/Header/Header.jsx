import React from 'react';
import styles from "./Header.module.css";
import logo from "./../../images/logo.png"
import { NavLink, Redirect } from "react-router-dom";

const Header = ({ isAuth, login, logout, image }) => {
    return (
        <header className={styles.header}>
            <img src={ logo } alt="logo"/>
            <div className={styles.loginBlock}>
                { isAuth
                    ? <HeaderProfile login={ login } logout={ logout } imgURL={ image } />
                    : <><NavLink to="/login">Login</NavLink> <Redirect to="/login"/> </>}
            </div>
        </header>
    )
};

const HeaderProfile = ({ login, logout, imgURL }) => {
    return (
        <div className={styles.headerProfile}>
            <div>
                <span>{ login }</span>
                <img src={ imgURL.small } alt="user_image"/>
                <button onClick={ logout }>Log out</button>
            </div>
        </div>
    )
};

export default Header;