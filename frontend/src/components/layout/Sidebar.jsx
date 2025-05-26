import {
  FiCreditCard,
  FiDollarSign,
  FiHome,
  FiLogOut,
  FiSend,
  FiSettings,
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
      <div className="w-64 h-screen bg-white shadow-md border-r border-gray-200 p-4 sticky top-0 overflow-y-auto pb-20">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Account</h2>
        <nav className="space-y-4">
          <NavLink
            to="/account"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition"
          >
            <FiHome className="w-5 h-5 mr-3" />
            Dashboard
          </NavLink>
  
          <NavLink
            to="/account/transactions"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition"
          >
            <FiCreditCard className="w-5 h-5 mr-3" />
            Transactions
          </NavLink>
  
          <NavLink
            to="/account/deposit-withdraw"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition"
          >
            <FiDollarSign className="w-5 h-5 mr-3" />
            Deposit & Withdraw
          </NavLink>
  
          <NavLink
            to="/account/transfer"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition"
          >
            <FiSend className="w-5 h-5 mr-3" />
            Transfer
          </NavLink>
  
          <NavLink
            to="/account/settings"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition"
          >
            <FiSettings className="w-5 h-5 mr-3" />
            Settings
          </NavLink>
  
          <button className="flex items-center px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg transition w-full mt-6">
            <FiLogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;
  