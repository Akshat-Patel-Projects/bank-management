import {
  useEffect,
  useState,
} from 'react';

import {
  FiCheckCircle,
  FiCreditCard,
  FiDollarSign,
  FiUser,
  FiXCircle,
} from 'react-icons/fi';

import axiosInstance from '../../utils/axiosInstance';

const Account = () => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axiosInstance.get("/accounts/me");
        setAccount(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load account details");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, []);

  if (loading)
    return <p className="text-center text-gray-600 text-lg">Loading account details...</p>;
  if (error)
    return <p className="text-red-500 text-center text-lg">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200 animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
        My Account
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Name Section */}
        <div className="flex items-center gap-3">
          <FiUser className="text-blue-500 text-2xl" />
          <p className="text-lg">
            <strong>Name:</strong> {account.firstName} {account.lastName}
          </p>
        </div>

        {/* Account Number */}
        <div className="flex items-center gap-3">
          <FiCreditCard className="text-green-500 text-2xl" />
          <p className="text-lg">
            <strong>Account #:</strong> {account.accountNumber}
          </p>
        </div>

        {/* Balance */}
        <div className="flex items-center gap-3">
          <FiDollarSign className="text-yellow-500 text-2xl" />
          <p className="text-lg">
            <strong>Balance:</strong> ${account.balance.toFixed(2)}
          </p>
        </div>

        {/* Account Type */}
        <div className="flex items-center gap-3">
          <FiCreditCard className="text-purple-500 text-2xl" />
          <p className="text-lg">
            <strong>Type:</strong> {account.accountType}
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          {account.status === "active" ? (
            <FiCheckCircle className="text-green-500 text-2xl" />
          ) : (
            <FiXCircle className="text-red-500 text-2xl" />
          )}
          <p className={`text-lg font-semibold ${account.status === "active" ? "text-green-600" : "text-red-600"}`}>
            {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;
