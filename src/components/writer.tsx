import React, { useState } from 'react';

const Writer: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleWrite = async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new NDEFReader();
        await ndef.write(message);
        alert("Successfully written to NFC tag!");
      } catch (error) {
        console.error("Error writing to NFC:", error);
        alert("Failed to write to NFC. Please try again.");
      }
    } else {
      alert("Web NFC is not supported in this browser.");
    }
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <p>
        Approach the NFC tag you want to write to and enter the data below.
      </p>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Enter data to write"
        className='p-2 rounded-md'
      />
      <button
        onClick={handleWrite}
        className='p-2 bg-slate-500 disabled:cursor-not-allowed text-white rounded-md disabled:opacity-50 opacity-100'
        disabled={!message}
      >
        Write to NFC
      </button>
    </div>
  );
};

export default Writer;