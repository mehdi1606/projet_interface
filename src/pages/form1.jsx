import React, { useState } from "react";
import axios from "axios";

import "./MyForm.css";


const MyForm = () => {
    const initialFormData = {
        id_trx: "",
        arn: "",
        card_number_emeuteur: "",
        card_number_recepteur: "",
        String: "",
        total_amount:"",
        last_bling:""
    };

    const [formData, setFormData] = useState(initialFormData);
    const [tableData, setTableData] = useState([]); // Added a separate useState for tableData

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSaveClick = () => {
        // Send formData to the API endpoint
        axios.post("http://localhost:8081/api/Data/Trx", formData)
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
            "id_trx :" + formData.id_trx + "\n" +
            "arn: " + formData.arn + "\n" +
            "card_number_emeuteur: " + formData.card_number_emeuteur + "\n" +
            "card_number_recepteur: " + formData.card_number_recepteur + "\n" +
            "String: " + formData.String+ "\n" +
            "total_amount: " + formData.total_amount+ "\n" +
            "last_bling: " + formData.last_bling

            ;

        window.alert(recapMessage);
    };
    return (
        <div>
            <h2>Enter Information:</h2>
            <div>
            <label>id_trx:</label>
            <input
                type="text"
                name="id_trx"
                value={formData.id_trx}
                onChange={handleChange}
            />
            </div>
            <div>
                <label>arn</label>
                <input
                    type="text"
                    name="arn"
                    value={formData.arn}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>card_number_emeuteur</label>
                <input
                    type="text"
                    name="card_number_emeuteur"
                    value={formData.card_number_emeuteur}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>card_number_emeuteur:</label>
                <input
                    type="text"
                    name="card_number_recepteur"
                    value={formData.card_number_recepteur}
                    onChange={handleChange}
                />
            </div>
          
            <div>
                <label> Date:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>total_amount:</label>
                <input
                    type="text"
                    name="total_amount"
                    value={formData.total_amount}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>last_bling:</label>
                <input
                    type="text"
                    name="last_bling"
                    value={formData.last_bling}
                    onChange={handleChange}
                />
            </div>

            <button onClick={handleSaveClick}>Save</button>
        </div>
    );
};

export default MyForm;
