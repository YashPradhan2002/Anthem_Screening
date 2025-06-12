import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';

const MembershipDropdown = ({ selectedMembership, onMembershipChange }) => {
  const [memberships, setMemberships] = useState([]);
  console.log('MembershipDropdown component rendered', selectedMembership);
  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}memberships`);
        setMemberships(response.data);
      } catch (error) {
        console.error('Error fetching memberships:', error);
      }
    };

    fetchMemberships();
  }, []);

  return (
    <select value={selectedMembership._id} onChange={onMembershipChange} className="form-select">
      <option value="">Select Membership</option>
      {memberships.map(membership => (
        <option key={membership._id} value={membership._id}>
          {membership.name}
        </option>
      ))}
    </select>
  );
};

export default MembershipDropdown;