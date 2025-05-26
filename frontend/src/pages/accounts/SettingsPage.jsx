import React from 'react';

import Settings from '../../components/accounts/Settings';
import Sidebar from '../../components/layout/Sidebar';

const SettingsPage = () => {
  return (
    <div className="flex flex-grow bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 p-8 mt-10">
        <Settings />
      </div>
    </div>
  );
};

export default SettingsPage;
