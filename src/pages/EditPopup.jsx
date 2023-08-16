import React, { useState } from 'react';
import './EditPopup.css';
import { Element } from 'react-scroll';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
    import PropTypes from 'prop-types';

    function EditPopup({togglePopup,   person, onClose }) {
        const [updatedPerson, setUpdatedPerson] = useState(person);
        EditPopup.propTypes = {
            togglePopup: PropTypes.func.isRequired,
            person: PropTypes.object.isRequired,
            onClose: PropTypes.func.isRequired,
         };
         
         EditPopup.defaultProps = {
            togglePopup: () => console.warn('togglePopup function is not provided!'),
         };
         
                  
        const handleInputChange = (e) => {
            setUpdatedPerson({
                ...updatedPerson,
                [e.target.name]: e.target.value
            });
        };
        
     
    
        const handleSubmit = async () => {
            
            try {
                 axios.put(`http://localhost:8081/api/Data/Card/${updatedPerson.num}`, updatedPerson);  
                 createNotification('success', 'Data saved successfully', 'Success');
                setTimeout(() => {
                    onClose(true);
                    if (typeof togglePopup === 'function') {
                       togglePopup();
                    } else {
                       console.error('togglePopup is not a function');
                    }
                 }, 1000);

            } 
                catch (error) {
                    console.error("Error updating person details:", error);
                    createNotification('error', 'Unknown error occurred', 'Error');
                }
                
            
        };
    
    const createNotification = (type, message, title = 'Notification', duration = 5000, callback = null) => {
        switch (type) {
          case 'success':
            NotificationManager.success(message, title, duration);
            break;
          case 'error':
            NotificationManager.error(message, title, duration, callback);
            break;
          case 'warning':
            NotificationManager.warning(message, title, duration, callback);
            break;
          case 'info':
            NotificationManager.info(message, title, duration);
            break;
          default:
            break;
        }
      };
    return (
        <div className="popupEdit-container">
            <div className="popupEdit-content">
                <h2>Edit Person Details {person.num} :</h2>
                
                <Element name="scroll-container" className="scroll-container">
    
    <div>
        <label>car number: </label>
        <input name="card_number" value={updatedPerson.card_number} onChange={handleInputChange} />
    </div>
    <div>
        <label>solde: </label>
        <input  name="sold" value={updatedPerson.sold} onChange={handleInputChange} />
    </div>
    <div>
        <label>Type: </label>
        <select name="type" value={updatedPerson.type} onChange={handleInputChange}>
            <option value="Master carde">Master carde</option>
            <option value="visa card">visa card</option>
            <option value="other">Other</option>
        </select>
    </div>
   
   

<div>
                <label>Expiration Date:</label>
                <input
                    type="date"
                    name="date_expiration"
                    value={updatedPerson.date_expiration}
                    onChange={handleInputChange}
                />
            </div>
            <div>
        <label>last fee amount: </label>
        <input  name="last_fee_amount" value={updatedPerson.last_fee_amount} onChange={handleInputChange} />
    </div>
    

</Element>

            <button onClick={handleSubmit}>Save Changes</button>
            <button onClick={() => onClose(false)}>Cancel</button>
            <NotificationContainer/>
        </div>
           
           
        </div>
    );
}

export default EditPopup;
