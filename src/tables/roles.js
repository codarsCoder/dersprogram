import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from '@mui/material';


const businesses = [
  {
    id: 1,
    name: 'ABC Company',
    owner: 'John Doe',
    category: 'Technology',
    payment: 'Credit Card',
    country: 'USA',
    city: 'New York',
    email: 'john.doe@abccompany.com',
    phone: '555-123-4567',
  },
  {
    id: 2,
    name: 'XYZ Corporation',
    owner: 'Jane Smith',
    category: 'Retail',
    payment: 'Paypal',
    country: 'Canada',
    city: 'Toronto',
    email: 'jane.smith@xyzcorp.com',
    phone: '555-987-6543',
  },
  {
    id: 3,
    name: '123 LLC',
    owner: 'Bob Johnson',
    category: 'Finance',
    payment: 'Check',
    country: 'USA',
    city: 'Chicago',
    email: 'bob.johnson@123llc.com',
    phone: '555-555-1212',
  },
];

const BusinessTable = () => {
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const filteredBusinesses = categoryFilter
    ? businesses.filter((b) => b.category === categoryFilter)
    : businesses;

  return (
    <>
      <Select value={categoryFilter} onChange={handleCategoryChange}>
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="Technology">Technology</MenuItem>
        <MenuItem value="Retail">Retail</MenuItem>
        <MenuItem value="Finance">Finance</MenuItem>
      </Select>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBusinesses.map((business) => (
            <TableRow key={business.id}>
              <TableCell>{business.id}</TableCell>
              <TableCell>{business.name}</TableCell>
              <TableCell>{business.owner}</TableCell>
              <TableCell>{business.category}</TableCell>
              <TableCell>{business.payment}</TableCell>
              <TableCell>{business.country}</TableCell>
              <TableCell>{business.city}</TableCell>
              <TableCell>{business.email}</TableCell>
              <TableCell>{business.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default BusinessTable;
