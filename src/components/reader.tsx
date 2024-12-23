import React, { useState, useEffect } from 'react';

const NFCReader: React.FC = () => {
  const [nfcData, setNfcData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startReading = async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new NDEFReader();
        await ndef.scan();

        ndef.onreading = (event) => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            const text = decoder.decode(record.data);
            setNfcData(text);
          }
        };

        ndef.onreadingerror = () => {
          console.error("Error reading NFC tag.");
          alert("Error reading NFC. Try again.");
        };
      } catch (error) {
        console.error("Error starting NFC scan:", error);
        setError("Failed to start NFC scan. Make sure NFC is enabled and you granted permissions.");
      }
    } else {
      setError("Web NFC is not supported in this browser.");
    }
  }

  useEffect(() => {
    startReading();
  }, []);

  return (
    <div className='w-full flex flex-col gap-4'>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {nfcData ? <p>NFC Data: {nfcData}</p> : <p>Waiting for NFC tag...</p>}

      <button className="w-fit px-6 py-2 bg-slate-500 rounded-md text-white" onClick={startReading}>
        Start scan
      </button>
    </div>
  );
};

export default NFCReader;