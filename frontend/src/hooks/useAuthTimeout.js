import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const useAuthTimeout = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // ✅ Wrap forceLogout in useCallback to prevent re-renders
  const forceLogout = useCallback(() => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const expiryTime = decoded.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeRemaining = expiryTime - currentTime;

      if (timeRemaining <= 0) {
        forceLogout();
        return;
      }

      // Show modal 1 minute before expiry
      const warningTimeout = timeRemaining > 60000 
        ? setTimeout(() => setModalVisible(true), timeRemaining - 60000) 
        : null;

      // Logout on expiry
      const logoutTimeout = setTimeout(forceLogout, timeRemaining);

      return () => {
        if (warningTimeout) clearTimeout(warningTimeout);
        clearTimeout(logoutTimeout);
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      forceLogout();
    }
  }, [forceLogout]);

  // Countdown effect when modal is visible
  useEffect(() => {
    if (modalVisible) {
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            forceLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [modalVisible, forceLogout]);

  return { modalVisible, setModalVisible, countdown, forceLogout };
};

export default useAuthTimeout;
