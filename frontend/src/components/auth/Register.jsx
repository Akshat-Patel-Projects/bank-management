import 'react-phone-input-2/lib/style.css';

import { useState } from 'react';

import {
  Button,
  Form,
  Input,
  message,
  Progress,
} from 'antd';
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../utils/axiosInstance';

const Register = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    if (/[\W_]/.test(password)) score += 20;
    return score;
  };

  const handlePasswordChange = (e) => setPasswordStrength(checkPasswordStrength(e.target.value));

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      await axiosInstance.post("/users/signup", values); // No need to assign response
      form.resetFields();
      
      // Show success message
      message.success("Registration successful! Please check your email to verify your account.");
      
      setTimeout(() => navigate("/verify-email?email=" + values.email), 3000); // Redirect to verification page
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div className="w-full max-w-3xl p-10 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-4xl font-semibold text-center text-gray-900 mb-3">Create an Account</h2>
      <p className="text-gray-500 text-center mb-6">Join us and start your journey today!</p>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please enter your first name!" }]}
          >
            <Input id="firstName" name="firstName" autoComplete="given-name" placeholder="John" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name!" }]}
          >
            <Input id="lastName" name="lastName" autoComplete="family-name" placeholder="Doe" />
          </Form.Item>
        </div>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
        >
          <Input id="email" name="email" autoComplete="email" placeholder="johndoe@example.com" />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password!" },
            { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, message: "Must be 8+ chars, incl. uppercase, lowercase, number & special char!" },
          ]}
        >
          <Input.Password
            id="password"
            name="password"
            autoComplete="new-password"
            onChange={handlePasswordChange}
            placeholder="••••••••"
          />
        </Form.Item>

        {/* Password Strength Indicator */}
        <Progress
          percent={passwordStrength}
          status={passwordStrength < 40 ? "exception" : passwordStrength < 80 ? "active" : "success"}
          showInfo={false}
        />

        {/* Phone Number */}
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Please enter your phone number!" }]}
        >
          <PhoneInput
            id="phone"
            name="phone"
            country={"us"}
            enableSearch
            onlyCountries={["us", "ca", "mx"]}
            inputClass="!w-full !py-3 !pl-14 !pr-4 !border-gray-300 !rounded-lg"
          />
        </Form.Item>

        {/* Register Button */}
        <Form.Item shouldUpdate>
          {({ getFieldsError, isFieldsTouched }) => (
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={!isFieldsTouched(true) || getFieldsError().some(({ errors }) => errors.length) || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
