import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className='fixed-footer'>
            <div className="left-footer"></div>
            <div className="center-footer">
                <p>© 2024 • Built by Andreas</p>
            </div>
            <div className="right-footer"></div>
        </div>
    );
};

export default Footer;