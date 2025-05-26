import React, { useState } from 'react';

const EditableField = ({ field, value, setEditingField, onSave }) => {
  const [inputValue, setInputValue] = useState(value); // ✅ Track input locally

  return (
    <div className="border-b pb-4">
      <label className="block text-gray-700 font-medium capitalize">{field}</label>
      
      {/* Input Field for Editing */}
      <input
        type={field === "email" ? "email" : "tel"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // ✅ Update input
        className="w-full p-2 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
      />
      
      {/* Save & Cancel Buttons */}
      <div className="flex justify-end mt-2">
        <button
          onClick={() => {
            onSave(inputValue); // ✅ Save new value
            setEditingField(null); // Close input after save
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
        >
          Save
        </button>
        
        <button
          onClick={() => setEditingField(null)}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditableField;
