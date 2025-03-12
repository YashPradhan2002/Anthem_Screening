import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomerForm from '../components/CustomerForm';

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div>
      <h3>Edit Customer</h3>
      <CustomerForm customerId={id} onSubmitSuccess={handleSuccess} />
    </div>
  );
};

export default EditCustomer;