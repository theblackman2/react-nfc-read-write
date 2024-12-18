import { useState } from "react";

const NFCReaderWriter = () => {
  const [inputValue, setInputValue] = useState(""); // Input field value
  const [nfcValue, setNfcValue] = useState(""); // Scanned NFC value

  // Write to NFC tag
  const writeToNFC = async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new NDEFReader();
        await ndef.write(inputValue); // Write input value to NFC
        alert("Successfully written to NFC tag!");
      } catch (error) {
        console.error("Error writing to NFC:", error);
        alert("Failed to write to NFC. Please try again.");
      }
    } else {
      alert("Web NFC is not supported in this browser.");
    }
  };

  // Read from NFC tag
  const readFromNFC = async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new NDEFReader();
        await ndef.scan();
        alert("Scan started. Approach an NFC tag.");

        ndef.onreading = (event) => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            const text = decoder.decode(record.data); // Decode text
            setNfcValue(text); // Update NFC value state
          }
        };

        ndef.onreadingerror = () => {
          console.error("Error reading NFC tag.");
          alert("Error reading NFC. Try again.");
        };
      } catch (error) {
        console.error("Error starting NFC scan:", error);
        alert("Failed to start NFC scan. Make sure NFC is enabled and you granted permissions.");
      }
    } else {
      alert("Web NFC is not supported in this browser.");
    }
  };

  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-800">NFC Reader/Scanner</h2>
      <p className="text-gray-600 bg-gray-200 p-2 rounded-md min-w-[200px] text-center">
        {nfcValue || "Scan a tag to see its content here"}
      </p>
      <div className="flex flex-col items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value to write"
          className="border border-gray-300 rounded-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={writeToNFC}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Write
        </button>
        <button
          onClick={readFromNFC}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Start Scan
        </button>
      </div>
    </main>
  );
};

export default NFCReaderWriter;
