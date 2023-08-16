import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { Link } from "react-router-dom";
import "./MyComponent.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditPopup from './EditPopup';

const MyComponent = () => {
    const [data, setData] = useState([]);
    const [highlightedRows, setHighlightedRows] = useState([]);
     const [personToEdit, setPersonToEdit] = useState(null);
     const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
     const [deleteCandidateId, setDeleteCandidateId] = useState(null);
     const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
     const [searchQuery, setSearchQuery] = useState("");
     const [filteredData, setFilteredData] = useState([]); // Added this state

     useEffect(() => {
         fetchData();
     }, []);
     
     useEffect(() => {
         if (searchQuery) {
             const matchedRows = data.filter(row => 
                 Object.values(row).some(value => 
                     String(value).toLowerCase().includes(searchQuery.toLowerCase())
                 )
             );
             setFilteredData(matchedRows);
         } else {
             setFilteredData(data);
         }
     }, [searchQuery, data]);
        const handleEdit = (person) => {
            setPersonToEdit(person);
            setIsEditPopupVisible(true);
        };
        const handleSearchChange = (e) => {
            const query = e.target.value;
            setSearchQuery(query);
        
            if (query) {
                const matchedRows = data.filter(row => 
                    [row.id_trx].some(value => 
                        String(value).toLowerCase().includes(query.toLowerCase())
                    )
                );
                setFilteredData(matchedRows);
            } else {
                setFilteredData(data);
            }
        };
        
        const closeEditPopup = (refresh) => {
            setIsEditPopupVisible(false);
            if (refresh) {
                fetchData();  // Refresh data if edit was successful
            }
        };
        useEffect(() => {
            fetchData();
        }, []);
        function renderActionButton(params) {
            return (
                <div className="action-icons-wrapper">
                    
                    <button 
                    className="action-button"
                    onClick={() => handleEdit(params.row)}
                >
                    <EditIcon style={{ color: '#9ccc65' }} />
                </button>
                <button 
                className="action-button"
                onClick={() => {
                    setDeleteCandidateId(params.row.id_trx);
                    handleDelete(params.row.id_trx);
                }}
    >
        <DeleteIcon style={{ color: '#ef5350' }} />
    </button>
                </div>
            );
        }
        
        const fetchData = () => {
            axios.get(`http://localhost:8081/api/Data/Trx`)
                .then(response => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        };
        const handleDelete = async (id_trx) => {
            try {
                await axios.delete(`http://localhost:8081/api/Data/Trx/${id_trx}`);
                // If delete was successful, show the archive confirmation popup
                setShowDeleteConfirmation(true);
                fetchData(); 
            } catch (error) {
                console.error("Error deleting person:", error);
            }
        };
        
  
        return (
        
        <div>
                 <div className="search-bar">
            <input 
                type="text" 
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange} 
            />
        </div>
        <div style={{ textAlign: "center" }}>

            <h1>Trx manage </h1>
            <Link to="/">
                <button className="button-in-corner">Deconnexion !</button>
            </Link>
            <Link to="/form1">
                <button>Create</button>
            </Link>
            </div>

            <div  className="table-data" style={{ height: 400, width: '96%',padding: '20px' }}>
                    <TableContainer component={Paper}>
                
               
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <DataGrid
         Srows={filteredData} 
            rows={data}
            columns={[
                { field: 'id_trx', headerName: 'id trx', width: 70 },
                { field: 'arn', headerName: 'ARN', width: 130 },
                { field: 'card_number_emeuteur', headerName: 'card number emeuteur', width: 130 },
                { field: 'card_number_recepteur', headerName: 'card number recepteur', width: 130 },
                { field: 'date', headerName: 'Date ', width: 130 },
                { field: 'total_amount', headerName: 'total amount ', width: 130 },
                { field: 'last_bling', headerName: 'last bling ', width: 130 },
                { field: 'actions', headerName: 'Actions', width: 200, renderCell: renderActionButton, sortable: false, filterable: false },
            ]}
            getRowClassName={(params) => {
                return highlightedRows.includes(params.id) ? "highlighted-row" : "";
            }}
            pageSize={5}
            checkboxSelection
            getRowId={(row) => row.id_trx}
        />
         </Table>
                    </TableContainer>
    </div>
    {
    showDeleteConfirmation && (
        <div className="delete-confirmation-popup">
            <p>Do you want to archive this card?</p>
            <button 
                style={{ backgroundColor: 'green' }} 
                onClick={() => {
                    console.log("Person archived");  // Implement archival logic here if needed
                    setShowDeleteConfirmation(false);
                    setDeleteCandidateId(null);
                }}
            >
                Yes
            </button>
            <button 
                style={{ backgroundColor: 'red' }} 
                onClick={() => {
                    setShowDeleteConfirmation(false);
                    setDeleteCandidateId(null);
                }}
            >
                No
            </button>
        </div>
    )
}
    {
                isEditPopupVisible && (
                    <EditPopup 
                        person={personToEdit} 
                        onClose={(refresh) => {
                            closeEditPopup(refresh); 
                            if (refresh) fetchData(); // Fetch data if edit was successful.
                        }} 
                    />
                )
            }
  
    </div>


    );
};
export default MyComponent;
