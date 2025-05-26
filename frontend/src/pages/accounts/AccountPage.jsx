import React from 'react';

import Account from '../../components/accounts/Account';
import Sidebar from '../../components/layout/Sidebar';

const AccountPage = () => {
  return (
    <div className="flex flex-grow bg-gray-100">
      {/* Sidebar stays fixed on the left */}
      <Sidebar />

      {/* Main content fills the remaining space and allows footer to stay below */}
      <div className="flex flex-col flex-1 min-h-screen">
        <div className="flex-1 flex items-center justify-center p-8 ">
          <Account />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
