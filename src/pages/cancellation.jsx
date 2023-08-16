import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import "./MyComponent.css";
import axios from "axios";

 
const MyComponent = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8081/api/Data/Identification")
            .then(response => {
                setTableData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []); 
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Identification manage </h1>
            <Link to="/form">
                <button>Create</button>
            </Link>
            <table
                style={{
                    border: "1px solid black",
                    margin: "20px auto",
                    width: "70%",
                }}
            >
               
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Bank</th>
                    <th>CARD_NUMBER</th>
                    <th>STATUS</th>
                    <th>client_code</th>
                    
                </tr>
                </thead>
                <tbody>
                {tableData.map(item => (
                    <tr key={item.id}>
                        <td>{item.Bank}</td>
                        <td>{item.card_number}</td>
                        <td>{item.status}</td>
                        <td>{item.client_code}</td>

                        
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default MyComponent;