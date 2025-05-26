import React from 'react';

const ContactInfoRow = ({ email, phone, setEditingField }) => {
  return (
    <div className="mt-6 w-full">
      <div className="flex justify-between items-center w-full bg-gray-50 p-4 rounded-lg shadow">
        {/* Email on the Left */}
        <div className="flex items-center gap-x-2 flex-1">
          <span className="font-medium">Email:</span>
          <span className="truncate">{email}</span>
          <button
            onClick={() => setEditingField("email")}
            className="text-blue-600 hover:underline"
          >
            Change
          </button>
        </div>

        {/* Phone on the Right */}
        <div className="flex items-center gap-x-2 flex-1 justify-end">
          <span className="font-medium">Phone:</span>
          <span className="truncate">{phone}</span>
          <button
            onClick={() => setEditingField("phone")}
            className="text-blue-600 hover:underline"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoRow;
