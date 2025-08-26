import React from 'react'
import CardNav from './CardNav.jsx';
import { href } from 'react-router-dom';

function UseCardNav() {
    const items = [
        {
            label: "Dashboard",
            bgColor: "#1E1E1E",
            textColor: "#DFD0B8",
            links: [
                { label: "Home", ariaLabel: "All Notes",href: "/dashboard/"}
            ]
        },
        {
            label: "Add Notes",
            bgColor: "#1E1E1E",
            textColor: "#DFD0B8",
            links: [
                { label: "Add a new Note", ariaLabel: "Add a new note",href: "/dashboard/addNote" }
                
            ]
        },
        {
            label: "Summary",
            bgColor: "#1E1E1E",
            textColor: "#DFD0B8",
            links: [
                { label: "Go to Summary Page", ariaLabel: "Email us", href: "/dashboard/summary" }
            ]
        }
    ];

    return (
        <CardNav
            logo={"/vite.svg"}
            logoAlt="Company Logo"
            items={items}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
        />
    )
}

export default UseCardNav