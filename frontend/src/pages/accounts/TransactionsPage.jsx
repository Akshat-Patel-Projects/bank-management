import React from 'react';

import Transactions from '../../components/accounts/Transactions';
import Sidebar from '../../components/layout/Sidebar';

const TransactionsPage = () => {
  return (
    <div className="flex flex-grow bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <div className="flex-1 flex items-center justify-center p-8 ">
          <Transactions />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
