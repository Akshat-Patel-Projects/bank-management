import React, {
  useEffect,
  useState,
} from 'react';

import useUserInfo from '../../hooks/useUserInfo';
import ContactInfoRow from '../settings/ContactInfoRow';
import EditFieldSection from '../settings/EditableField';

const Settings = () => {
  const { email, phone, message, error, updateContactInfo } = useUserInfo();
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [notification, setNotification] = useState({ message: null, error: null });

  // Automatically clear messages after 3 seconds
  useEffect(() => {
    if (message || error) {
      setNotification({ message, error });

      const timer = setTimeout(() => {
        setNotification({ message: null, error: null });
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [message, error]);

  return (
    <div className="w-full min-h-screen p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">Settings</h2>

      {/* Toggle Contact Info Section */}
      <button
        onClick={() => setShowContactInfo(!showContactInfo)}
        className="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
      >
        <span className="text-gray-700 font-medium">Change Contact Information</span>
      </button>

      {/* Contact Information Display */}
      {showContactInfo && !editingField && (
        <ContactInfoRow email={email} phone={phone} setEditingField={setEditingField} />
      )}

      {/* Editable Field Section */}
      {editingField && (
        <EditFieldSection
          field={editingField} // Pass the field name
          value={editingField === "email" ? email : phone} // Correct value
          setEditingField={setEditingField}
          onSave={(newValue) => updateContactInfo(editingField, newValue)}
        />
      )}

      {/* Success & Error Messages (Auto disappear after 3s) */}
      {notification.message && <p className="text-green-600 mt-6">{notification.message}</p>}
      {notification.error && <p className="text-red-600 mt-6">{notification.error}</p>}
    </div>
  );
};

export default Settings;
