import React from 'react';

import { Modal } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import useAuthTimeout from './hooks/useAuthTimeout';
// Account Pages
import AccountPage from './pages/accounts/AccountPage';
import DepositWithdrawPage from './pages/accounts/DepositWithdrawPage';
import SettingsPage from './pages/accounts/SettingsPage';
import TransactionsPage from './pages/accounts/TransactionsPage';
import TransferPage from './pages/accounts/TransferPage';
// Pages
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// Utils
import AuthRedirect from './utils/AuthDirect';
import ProtectedRoute from './utils/protectedRoute';

// ✅ Move `useAuthTimeout` INSIDE <Router>
const App = () => {
  return (
    <Router>
      <AuthHandler />
    </Router>
  );
};

// ✅ Separate Component to Use `useAuthTimeout`
const AuthHandler = () => {
  const { modalVisible, setModalVisible, countdown, forceLogout } =
    useAuthTimeout();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <AuthRedirect>
                  <LoginPage />
                </AuthRedirect>
              }
            />
            <Route path="/register" element={<RegisterPage />} />


            {/* ✅ Protected Account Routes */}
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/transactions"
              element={
                <ProtectedRoute>
                  <TransactionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/deposit-withdraw"
              element={
                <ProtectedRoute>
                  <DepositWithdrawPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/transfer"
              element={
                <ProtectedRoute>
                  <TransferPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* ✅ Session Expiry Modal */}
      <Modal
        title="Session Expiring"
        open={modalVisible}
        onOk={() => setModalVisible(false)} // Stay logged in
        onCancel={forceLogout} // Logout user
        okText="Stay Logged In"
        cancelText="Logout"
      >
        <p>
          Your session will expire in <strong>{countdown} seconds</strong>. Do
          you want to stay logged in?
        </p>
      </Modal>
    </>
  );
};

export default App;
