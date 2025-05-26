import { useState } from 'react';

import {
  Button,
  Form,
  Input,
  message,
} from 'antd';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/users/login", values);
      localStorage.setItem("accessToken", response.data.accessToken);
      message.success("Login successful!");
      setTimeout(() => navigate("/account"), 1500);
    } catch (error) {
      message.error(error.response?.data?.message || "Login failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl p-10 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-4xl font-semibold text-center text-gray-900 mb-3">Welcome Back</h2>
      <p className="text-gray-500 text-center mb-6">Sign in to continue your journey!</p>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        {/* Email */}
        <Form.Item
          label={<label htmlFor="email" className="block text-md font-medium text-gray-900">Email</label>}
          name="email"
          rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
        >
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="johndoe@example.com"
            className="p-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition" />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label={<label htmlFor="password" className="block text-md font-medium text-gray-900">Password</label>}
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password id="password" name="password" autoComplete="current-password" placeholder="••••••••"
            className="p-3 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition" />
        </Form.Item>

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <Link to="#" className="text-blue-500 font-medium hover:underline">Forgot Password?</Link>
        </div>

        {/* Login Button */}
        <Form.Item shouldUpdate>
          {({ getFieldsError, isFieldsTouched }) => (
            <Button type="primary" htmlType="submit" block
              className="py-3 text-lg font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300"
              disabled={!isFieldsTouched(true) || getFieldsError().some(({ errors }) => errors.length) || isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </Button>
          )}
        </Form.Item>
      </Form>

      {/* Sign Up Link */}
      <p className="text-center text-gray-600">
        <span>Don't have an account?</span>
        <Link to="/register" className="text-blue-500 font-medium hover:underline ml-1">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
