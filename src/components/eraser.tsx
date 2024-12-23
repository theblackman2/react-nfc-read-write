import React from 'react';

const Eraser: React.FC = () => {
  const handleErase = async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new NDEFReader();
        await ndef.write(""); // Erase NFC tag
        alert("Successfully erased NFC tag!");
      } catch (error) {
        console.error("Error erasing NFC:", error);
        alert("Failed to erase NFC. Please try again.");
      }
    } else {
      alert("Web NFC is not supported in this browser");
    }
  };

  return (
    <div className='w-full flex flex-col gap-4 items-center'>
      <p>
        Approach the NFC tag you want to erase and click the button below.
      </p>
      <button className='w-fit px-4 py-2 rounded-md text-white bg-red-500' onClick={handleErase}>Erase</button>
    </div>
  );
};

export default Eraser;