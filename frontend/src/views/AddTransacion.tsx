import React from 'react';
import BackArrow from '../components/BackArrow';
import AddTransactionForm from '../components/AddTransactionForm';

const AddTransactionView = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4">
        <BackArrow to="/dashboard" />
      </div>

      <AddTransactionForm />
    </div>
  );
};

export default AddTransactionView;
