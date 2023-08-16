import React, { useState } from "react";
import axios from "axios";

import "./MyForm.css";


const MyForm = () => {
    const initialFormData = {
        num: "",
        cardNumber: "",
        sold: "",
        type: "",
        expirationDate: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [tableData, setTableData] = useState([]); // Added a separate useState for tableData

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSaveClick = () => {
        // Send formData to the API endpoint
        axios.post("http://localhost:8081/api/Data/Card", formData)
        .then(response => {
            setTableData(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

        console.log("Form Data:", formData);
        showRecap();
    };
    const showRecap = () => {  
        const recapMessage =
            "Recapitulatif:\n" +
            "Num: " + formData.num + "\n" +
            "Card Number: " + formData.card_number + "\n" +
            "Sold: " + formData.sold + "\n" +
            "Type: " + formData.type + "\n" +
            "Expiration Date: " + formData.date_expiration;

        window.alert(recapMessage);
    };
    return (
        <div>
            <h2>Enter Information:</h2>
            <div>
            <label>Num:</label>
            <input
                type="text"
                name="num"
                value={formData.num}
                onChange={handleChange}
            />
            </div>
            <div>
                <label>Card Number:</label>
                <input
                    type="text"
                    name="card_number"
                    value={formData.card_number}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Sold:</label>
                <input
                    type="text"
                    name="sold"
                    value={formData.sold}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Type:</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="Master card "
                            checked={formData.type === "Master card"}
                            onChange={handleChange}
                        />
                        Master card 
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="visa card"
                            checked={formData.type === "visa card"}
                            onChange={handleChange}
                        />
                        visa card
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="Option 3"
                            checked={formData.type === "Option 3"}
                            onChange={handleChange}
                        />
                        Option 3
                    </label>
                </div>
            </div>
            <div>
                <label>Expiration Date:</label>
                <input
                    type="date"
                    name="date_expiration"
                    value={formData.date_expiration}
                    onChange={handleChange}
                />
            </div>

            <button onClick={handleSaveClick}>Save</button>
        </div>
    );
};

export default MyForm;
