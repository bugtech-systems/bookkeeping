import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';

export default function MainContent() {
    return (
        <div className='app'>
            <Sidebar />
            <Content />
        </div>
    )
}
