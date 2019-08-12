import React from 'react';
import './index.css';

import logo from '../../assets/logo.svg';

export default function Header() {
    return (
        <header>
            <div>
                <img src={ logo } alt="Clocker" />
                <span>Clocker</span>
            </div>
            <span>Menu</span>
        </header>
    );
}