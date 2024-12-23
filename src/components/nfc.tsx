import { useState } from "react";
import NFCReader from "./reader";
import Writer from "./writer";

const NFCReaderWriter = () => {
  const [action, setAction] = useState<'read' | 'write'>("read"); // Read or write action
  // const [inputValue, setInputValue] = useState(""); // Input field value
  // const [nfcValue, setNfcValue] = useState(""); // Scanned NFC value

  // // Write to NFC tag
  // const writeToNFC = async () => {
  //   if ("NDEFReader" in window) {
  //     try {
  //       const ndef = new NDEFReader();
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

  // // Read from NFC tag
  // const readFromNFC = async () => {
  //   if ("NDEFReader" in window) {
  //     try {
  //       const ndef = new NDEFReader();
  //       await ndef.scan();
  //       alert("Scan started. Approach an NFC tag.");

  //       ndef.onreading = (event) => {
  //         const decoder = new TextDecoder();
  //         for (const record of event.message.records) {
  //           const text = decoder.decode(record.data); // Decode text
  //           setNfcValue(text); // Update NFC value state
  //         }
  //       };

  //       ndef.onreadingerror = () => {
  //         console.error("Error reading NFC tag.");
  //         alert("Error reading NFC. Try again.");
  //       };
  //     } catch (error) {
  //       console.error("Error starting NFC scan:", error);
  //       alert("Failed to start NFC scan. Make sure NFC is enabled and you granted permissions.");
  //     }
  //   } else {
  //     alert("Web NFC is not supported in this browser.");
  //   }
  // };

  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <div className="w-full flex flex-col gap-10 container">
        <div className="w-full grid grid-cols-2 gap-3">
          <button className={`w-full transition-all duration-200 p-2 flex items-center justify-center rounded-md ${action === "read" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => setAction("read")}>
            Read NFC
          </button>
          <button className={`w-full transition-all duration-200 p-2 flex items-center justify-center rounded-md ${action === "write" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => setAction("write")}>
            Write NFC
          </button>
        </div>
        {
          action == 'read' && (
            <NFCReader />
          )
        }
        {
          action == 'write' && (
            <Writer />
          )
        }
      </div>
    </main>
  );
};

export default NFCReaderWriter;
