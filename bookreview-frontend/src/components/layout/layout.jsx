import React from 'react';
import { Footer } from './footer';
import { Nav } from './navigation';

export const Layout = ({ children }) => {
    return(<>
        <Nav/>
        <div>{ children }</div>
        <div className='bottom'>
            <Footer/>
        </div>
    </>)
}