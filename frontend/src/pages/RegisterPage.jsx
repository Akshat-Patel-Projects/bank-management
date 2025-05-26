import React, {
  useEffect,
  useState,
} from 'react';

import background from '../assets/background.png'; // Ensure correct path
import Register from '../components/auth/Register';

const RegisterPage = () => {
  const [showImage, setShowImage] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const imageTimer = setTimeout(() => {
      setShowImage(true);
    }, 300);

    const formTimer = setTimeout(() => {
      setShowForm(true);
    }, 800);

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(formTimer);
    };
  }, []);

  return (
    <div 
      className="flex w-full min-h-screen overflow-hidden relative bg-gray-500 bg-cover bg-center"
    >
      {/* Image Section - Starts Fullscreen, Resizes but Never Disappears */}
      <div
        className={`absolute top-0 left-0 h-full transition-all duration-[1500ms] ease-in-out shadow-[0px_10px_40px_rgba(0,0,0,0.5)] ${
          showImage ? "w-2/3 md:w-1/2" : "w-full"
        }`}
        style={{ zIndex: 1 }}
      >
        {/* Image with Overlay */}
        <div className="relative w-full h-full">
          <img
            src={background}
            alt="Secure Login"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div> {/* Darker Overlay for More Contrast */}
        </div>
      </div>

      {/* Form Section - Always Visible, Slides In Properly */}
      <div
        className={`absolute right-0 top-0 w-full md:w-1/2 h-full flex justify-center items-center transition-all duration-[1000ms] ease-in-out ${
          showForm ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
        }`}
        style={{ zIndex: 2 }}
      >
        <div className="w-full max-w-lg px-6 mt-12 md:mt-20"> {/* Lowered Form */}
          <Register />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
