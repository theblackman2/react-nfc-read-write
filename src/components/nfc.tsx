/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

const NFCReaderWriter = () => {
  const [inputValue, setInputValue] = useState(""); // Input field value
  const [nfcValue, setNfcValue] = useState(""); // Scanned NFC value

  // Write to NFC tag
  // const writeToNFC = async () => {
  //   if ("NDEFReader" in window) {
  //     try {
  //       const ndef = new (window.NDEFReader as any)();
  //       await ndef.write(inputValue); // Write input value to NFC
  //       alert("Successfully written to NFC tag!");
  //     } catch (error) {
  //       console.error("Error writing to NFC:", error);
  //       alert("Failed to write to NFC. Please try again.");
  //     }
  //   } else {
  //     alert("Web NFC is not supported in this browser.");
  //   }
  // };

  // Read from NFC tag
  const readFromNFC = async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new (window.NDEFReader as any)();
        await ndef.scan();
        alert("Scan started. Approach an NFC tag.");

        ndef.onreading = (event: any) => {
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
        alert("Failed to start NFC scan.");
      }
    } else {
      alert("Web NFC is not supported in this browser.");
    }
  };

  // Start NFC reading when the component mounts
  useEffect(() => {
    readFromNFC();
  }, []);

  return (
    <main
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h2 style={{ fontSize: "20px" }}>NFC Reader/Scanner</h2>
      <p>{nfcValue || "Scan a tag to see its content here"}</p>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value to write"
        />
      </div>
      {/* <button onClick={writeToNFC}>Write</button> */}
    </main>
  );
};

export default NFCReaderWriter;
