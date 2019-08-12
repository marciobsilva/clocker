import React from 'react';
import { HeaderMenu } from './styles';

import logo from '../assets/logo.svg';

const Header = () => (
    <HeaderMenu>
        <div>
            <img src={ logo } alt="Clocker" />
            <h1>Clocker</h1>
        </div>
        <h1>Menu</h1>
    </HeaderMenu>
);

export default Header;
