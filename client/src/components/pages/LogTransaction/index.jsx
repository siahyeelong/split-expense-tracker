import { React, useState } from 'react'
import { Box } from '@mui/material';
import Header from '../Header';
import { People as people } from '../../settings/People';
import { Categories as categories } from '../../settings/Categories';
import 'bootstrap/dist/css/bootstrap.min.css';



function LogTransaction() {
    const [formData, setFormData] = useState({
        recipients: [],
        category: '',
        price: '',
        description: '',
        payer: ''
    });

    const [errors, setErrors] = useState({});

    // Handle checkbox change: append / remove recipients from recipients array
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            recipients: checked
                ? [...prev.recipients, name] // append a recipient 
                : prev.recipients.filter((recipient) => recipient !== name) // remove the recipient from the list
        }));
    };

    // Handle all other changes by updating the corresponding values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.recipients.length) newErrors.recipients = "Please select at least one recipient.";
        if (!formData.category) newErrors.category = "Please select a category.";
        if (!formData.price || isNaN(formData.price)) newErrors.price = "Price must be a valid number.";
        if (!formData.description) newErrors.description = "Description is required.";
        if (!formData.payer) newErrors.payer = "Please select who paid.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (validate()) {
            // Submit form logic here
            try {
                let response = "";

                response = await fetch("http://localhost:5050/record", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                alert('Transaction logged successfully!');

            } catch (error) {
                console.error("something went wrong with updating a record: ", error);
                alert("Something went wrong!");
            } finally {
                // Clear form
                setFormData({
                    recipients: [],
                    category: '',
                    price: '',
                    description: '',
                    payer: ''
                });
            }
        }
    };

    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'Log Transaction'} subtitle={'Log an expense here'} />
            </Box>

            <form onSubmit={handleSubmit} className="container mt-4 ">
                {/* Checkbox input for who paid */}
                <div className="mb-3">
                    <label className="form-label">Who is it for?</label><br />
                    {people.map((person) => (
                        <div key={person.identifier} className='form-check'>
                            <input type='checkbox' name={person.identifier} className='form-check-input' checked={formData.recipients.includes(person.identifier)} onChange={handleCheckboxChange} />
                            <label className='form-check-label' htmlFor={person.identifier}>{person.displayName}</label>
                        </div>
                    ))}

                    {errors.recipients && <div className="text-danger">{errors.recipients}</div>}
                </div>
                {/* Dropdown input for category selection */}
                < div className="mb-3" >
                    <label htmlFor="category" className="form-label">Category</label>
                    <select name="category" id="category" className="form-select" value={formData.category} onChange={handleChange}>
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option value={cat}>{cat}</option>
                        ))}
                    </select>
                    {errors.category && <div className="text-danger">{errors.category}</div>}
                </div>
                {/* Text input for price input */}
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="text"
                        name="price"
                        id="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    {errors.price && <div className="text-danger">{errors.price}</div>}
                </div>
                {/* Text input for description input */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        className="form-control"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                    {errors.description && <div className="text-danger">{errors.description}</div>}
                </div>
                {/* Dropdown input for who paid */}
                <div className="mb-3">
                    <label htmlFor="payer" className="form-label">Who Paid?</label>
                    <select name="payer" id="payer" className="form-select" value={formData.payer} onChange={handleChange}>
                        <option value="">Select Payer</option>
                        {people.map((person) => (
                            <option value={person.identifier}>{person.displayName}</option>
                        ))}
                    </select>
                    {errors.payer && <div className="text-danger">{errors.payer}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Box >
    )
}

export default LogTransaction;
