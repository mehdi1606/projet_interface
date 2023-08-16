import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import { FaTh, FaIconName, FaBars,FaCreditCard,FaExchangeAlt,FaList } from "react-icons/fa";

const Sidebar = ({ children }) => {
    const [isOpen,setIsOpen]=useState(false) ;
    const toggle=() =>setIsOpen(!isOpen) ;
    const menuItems = [
        {
            path: "/page",
            name: "Dashboard",
            icon: <FaTh />,
        },
        {
            path: "/card",
            name: "Card",
            icon: <FaCreditCard />,
        },
        {
            path: "/cardList",
            name: "CardList",
            icon: <FaList  />,
        },
        {
            path: "/transaction",
            name: "Transaction",
            icon: <FaExchangeAlt />,
        },    
        {
            path: "/cancellation",
            name: "Identification ",
            icon: <FaExchangeAlt  />,
        },
        
        {
            path: "/home",
            name: "Deconnexion",
            icon: <fa-sign-out   />,
        },
    ];

    return (
        <div className="container">
            <div style={{width: isOpen ? "300px":"50px"}} className="sidebar">
                <div className="top_section">
                <img
  src="src/images/logo.png"
  alt=" "
  style={{ display: isOpen ? "block" : "none" }}
  className="logo"
/>  
                    <div style={{marginLeft: isOpen ? "50px":"0px"}} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {menuItems.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link" activeClassName="active">
                        <div className="icon">{item.icon}</div>
                        <div style={{display: isOpen ? "block":"none"}} className="link_text">{item.name}</div>
                    </NavLink>
                ))}
            </div>
            <main>{children}</main>
        </div>
    );
};
export default Sidebar;
