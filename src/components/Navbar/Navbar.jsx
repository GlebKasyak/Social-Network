import React from 'react';
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import cn from "classnames";

const Navbar = () => (
        <nav className={styles.nav}>
            <div className={styles.item}>
                <i className={cn("far fa-user ", styles.icon)}/>
                <NavLink to="/profile" activeClassName={styles.active}>Profile</NavLink>
            </div>
            <div className={styles.item}>
                <i className={cn("far fa-envelope-open ", styles.icon)}/>
                <NavLink to="/dialogs" activeClassName={styles.active}>Message</NavLink>
            </div>
            <div className={styles.item}>
                <i className={cn("fas fa-users ", styles.icon)}/>
                <NavLink to="/users" activeClassName={styles.active}>Users</NavLink>
            </div>
        </nav>
);

export default Navbar;