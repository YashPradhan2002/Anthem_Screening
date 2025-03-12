import Customer from '../models/Customer.js';

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate('membershipId');
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
};
export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id).populate('membershipId');
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error });
  }
};  
export const createCustomer = async (req, res) => {
  console.log('req.body:', req.body);
  const { firstName, lastName, email, contactNumber, status, membershipId } = req.body;

  if (!firstName || !lastName || !email || !contactNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const newCustomer = new Customer({ firstName, lastName, email, contactNumber, status, membershipId });
    await newCustomer.save();
    console.log('newCustomer:', newCustomer);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, contactNumber, status, membershipId } = req.body;

  if (!firstName || !lastName || !email || !contactNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, { firstName, lastName, email, contactNumber, status, membershipId }, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error });
  }
};