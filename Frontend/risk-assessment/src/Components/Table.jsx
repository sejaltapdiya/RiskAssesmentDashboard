import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, Paper, TableHead, Button, TextField } from "@mui/material";
import axios from 'axios';

const DataTable = () => {
    const [formData, setFormData] = useState({
        id: '',
        gender: '',
        income: '',
        loan_purpose: '',
        loan_amount: '',
        age: '',
        credit_score: '',
    });
    const [riskData, setRiskData] = useState([]);
    const [editing, setEditing] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    // Fetching data from the backend
    const fetchRiskData = () => {
        axios.get("http://localhost:9192/api/dashboard", { withCredentials: true })
            .then((response) => setRiskData(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    };

    useEffect(() => {
        fetchRiskData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiCall = editing
            ? axios.put(`http://localhost:9192/api/dashboard/${formData.id}`, formData, { withCredentials: true })
            : axios.post("http://localhost:9192/api/dashboard", formData, { withCredentials: true });

        apiCall.then(() => {
            fetchRiskData();
            setEditing(false);
            setFormData({ id: '', gender: '', income: '', loan_purpose: '', loan_amount: '', age: '', credit_score: '' });
        }).catch(error => console.error("Error saving data:", error));
    };

    // Delete functionality
    const handleDelete = (id) => {
        axios.delete(`http://localhost:9192/api/dashboard/${id}`, { withCredentials: true })
            .then(() => fetchRiskData())
            .catch(error => console.error("Error deleting data:", error));
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const paginatedData = riskData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    return (
        <div>
            {/* Form */}
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <TextField label="Gender" name="gender" value={formData.gender} onChange={handleInputChange} required />
                <TextField label="Income" name="income" value={formData.income} type="number" onChange={handleInputChange} required />
                <TextField label="Loan Purpose" name="loan_purpose" value={formData.loan_purpose} onChange={handleInputChange} required />
                <TextField label="Loan Amount" name="loan_amount" value={formData.loan_amount} type="number" onChange={handleInputChange} required />
                <TextField label="Age" name="age" value={formData.age} type="number" onChange={handleInputChange} required />
                <TextField label="Credit Score" name="credit_score" value={formData.credit_score} type="number" onChange={handleInputChange} required />
                <Button type="submit" variant="contained" color="primary">{editing ? "Update" : "Add"}</Button>
            </form>

            {/* Data Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Gender</TableCell>
                            <TableCell>Income</TableCell>
                            <TableCell>Loan Purpose</TableCell>
                            <TableCell>Loan Amount</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Credit Score</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.gender}</TableCell>
                                <TableCell>{row.income}</TableCell>
                                <TableCell>{row.loan_purpose}</TableCell>
                                <TableCell>{row.loan_amount}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>{row.credit_score}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => { setFormData(row); setEditing(true); }}>Edit</Button>
                                    <Button color="secondary" onClick={() => handleDelete(row.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 50]}
                            count={riskData.length}
                            rowsPerPage={rowsPerPage}
                            page={currentPage}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DataTable;
