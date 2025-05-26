import {
  useEffect,
  useState,
} from 'react';

import axiosInstance from '../utils/axiosInstance';

const useUserInfo = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axiosInstance.get("/users/me");
        setEmail(data.email);
        setPhone(data.phone);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    fetchUserInfo();
  }, []);

  const updateContactInfo = async (field, newValue) => {
    setMessage(null);
    setError(null);

    try {
      const { data } = await axiosInstance.put("/users/update-contact", { [field]: newValue });

      setMessage(data.message);
      field === "email" ? setEmail(newValue) : setPhone(newValue);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return { email, phone, message, error, updateContactInfo };
};

export default useUserInfo;
