import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MembershipDropdown from './MembershipDropdown';
import config from '../config/config';

const CustomerForm = ({ customerId, onSubmitSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [status, setStatus] = useState('Gold');
  const [membershipId, setMembershipId] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customerId) {
      fetchCustomer(customerId);
    }
  }, [customerId]);

  const fetchCustomer = async (id) => {
    try {
      const response = await axios.get(`${config.apiUrl}customers/${id}`);
      const customer = response.data;
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
      setEmail(customer.email);
      setContactNumber(customer.contactNumber);
      setStatus(customer.status);
      setMembershipId(customer.membershipId);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!contactNumber) newErrors.contactNumber = 'Contact number is required';
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) newErrors.email = 'Email is not valid';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const customerData = { firstName, lastName, email, contactNumber, status, membershipId };

    try {
      if (customerId) {
        await axios.put(`${config.apiUrl}customers/${customerId}`, customerData);
      } else {
        await axios.post(`${config.apiUrl}customers`, customerData);
      }
      onSubmitSuccess();
    } catch (error) {
      alert('Error submitting customer data');
      console.error('Error submitting customer data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input
          type="text"
          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input
          type="text"
          className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="contactNumber" className="form-label">Contact Number</label>
        <input
          type="text"
          className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
          id="contactNumber"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />
        {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">Status</label>
        <br></br>
        <select
          className="form-select"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Gold">Gold</option>
          <option value="Diamond">Diamond</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="membership" className="form-label">Membership</label>
        <br></br>
        <MembershipDropdown
          selectedMembership={membershipId}
          onMembershipChange={(e) => setMembershipId(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default CustomerForm;