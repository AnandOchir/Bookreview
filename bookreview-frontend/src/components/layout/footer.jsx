import React from 'react';

export const Footer = () => {
    return (<>
        <div>
            <logo>
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H50V50H0V0Z" fill="#9D9D9D" />
                </svg>
            </logo>
            <div style={{ flexDirection: 'column', }}>
                <h1>БИБЛИОТЕЧНАЯ</h1>
                <svg width="127" height="1" viewBox="0 0 127 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="0.5" x2="127" y2="0.5" stroke="black" stroke-opacity="0.31" />
                </svg>
                <h1>книжный магазин</h1>
            </div>
        </div>
    </>)
}