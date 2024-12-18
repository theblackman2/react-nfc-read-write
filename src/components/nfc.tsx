/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";

const NFCReaderWriter = () => {
  const [inputValue, setInputValue] = useState("");
  const [nfcValue, setNfcValue] = useState("");


  const onReading = ({ message }: { message: any, serialNumber: any }) => {
    console.log(message)
    for (const record of message.records) {
      console.log(record)
      switch (record.recordType) {
        case "text":
          {
            const textDecoder = new TextDecoder(record.encoding);
            setNfcValue(textDecoder.decode(record.data));
            break;
          }
        case "url":
          // TODO: Read URL record with record data.
          break;
        default:
        // TODO: Handle other records with record data.
      }
    }
  };

  const scan = useCallback(async () => {
    if ('NDEFReader' in window) {
      try {
        const ndef = new (window.NDEFReader as any)();
        await ndef.scan();

        alert("Scan started successfully.");
        ndef.onreadingerror = () => {
          console.log("Cannot read data from the NFC tag. Try another one?");
        };

        ndef.onreading = (event: any) => {
          console.log("NDEF message read.");
          onReading(event);
        };

      } catch (error) {
        alert(`Error! Scan failed to start: ${error}.`);
      };
    }
    else {
      alert('NDEFReader feature not availlable')
    }
  }, [])

  // Write to NFC tag
  const writeToNFC = async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new (window.NDEFReader as any)();
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

  // Start NFC reading when the component mounts
  useEffect(() => {
    scan();
  }, [scan]);

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
      <button onClick={writeToNFC}>Write</button>
    </main>
  );
};

export default NFCReaderWriter;
