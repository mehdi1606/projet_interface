import React from "react";
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import cardList from "./pages/cardList";
import Sidebar from "./components/sidebar";
import Transaction from "./pages/transaction";
import "./stylles.css"; 
import { FaTh} from 'react-icons/fa';
import PropTypes from "prop-types";
import Form from "./pages/form";
import MyForm from "./pages/form1";
import Cancellation from "./pages/cancellation";
import { ThemeProvider } from './pages/theme';
import MyComponent from "./pages/cardList";
import Login from "./Login1";
import Das from "./pages/page";

function TooltipComponent(props) {
    return (
        <div className={`tooltip tooltip-${props.position}`}>
            {props.content}
            {props.children}
        </div>
    );
}
TooltipComponent.propTypes = {
    position: PropTypes.string,
    content: PropTypes.string,
    children: PropTypes.node
};
function App() {  
    const [selectedStep, setSelectedStep] = useState('Login');
                                                
    return (
        <ThemeProvider>
        <BrowserRouter>
             <div className="flex relative dark:bg-main-dark-bg">
                <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                    <TooltipComponent content="Paramètres" position="Haut">
                       <button
                            type="button"
                            className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                            style={{ background: 'black', borderRadius: '50%' }}
                        >
                            <FaTh/>
                        </button>
                    </TooltipComponent>
                </div>
            </div>
            <div className="App">
                {
                    }
                <Sidebar>
                    <Routes>

                    <Route path="/" element={<Login/>} />
                        <Route path="/transaction" element={<Transaction />} />
                        <Route path="/Login/cardList" element={<MyComponent />} />
                        <Route path="/form" element={<Form/>} />
                        <Route path="/form1" element={<MyForm/>} />
                        <Route path="/cancellation" element={<Cancellation />} />
                        <Route path="/page" element={<Das />} />
                    </Routes>
                </Sidebar>  
            </div>
        </BrowserRouter>
        </ThemeProvider>
    );
}
export default App;