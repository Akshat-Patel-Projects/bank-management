import { Navigate } from 'react-router-dom';

const AuthRedirect = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  return accessToken ? <Navigate to="/" replace /> : children;
};

export default AuthRedirect;
