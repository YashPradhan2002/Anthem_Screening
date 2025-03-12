import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomerForm from '../components/CustomerForm';

const NewCustomer = () => {
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate('/');
  };
  return (
    <div>
      <h3 className="mt-4">New Customer</h3>
      <CustomerForm onSubmitSuccess={handleSuccess} />
    </div>
  );
};

export default NewCustomer;
