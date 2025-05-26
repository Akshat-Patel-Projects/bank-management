import React from 'react';

import Transfer from '../../components/accounts/Transfer';
import Sidebar from '../../components/layout/Sidebar';

const TransferPage = () => {
  return (
    <div className="flex flex-grow bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <div className="flex-1 flex items-center justify-center p-8 ">
          <Transfer />
        </div>
      </div>
    </div>
  );
};

export default TransferPage;
