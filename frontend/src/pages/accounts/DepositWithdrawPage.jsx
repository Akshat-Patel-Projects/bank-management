import React from 'react';

import DepositWithdraw from '../../components/accounts/DepositWithdraw';
import Sidebar from '../../components/layout/Sidebar';

const DepositWithdrawPage = () => {
  return (
    <div className="flex flex-grow bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <div className="flex-1 flex items-center justify-center p-8 ">
          <DepositWithdraw />
        </div>
      </div>
    </div>
  );
};

export default DepositWithdrawPage;
