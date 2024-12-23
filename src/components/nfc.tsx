import { useState } from "react";
import NFCReader from "./reader";
import Writer from "./writer";
import Eraser from "./eraser";

const NFCReaderWriter = () => {
  const [action, setAction] = useState<'read' | 'write' | 'erase'>("read");

  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <div className="w-full flex flex-col gap-10 container">
        <div className="w-full grid grid-cols-3 gap-3">
          <button className={`w-full transition-all duration-200 p-2 flex items-center justify-center rounded-md ${action === "read" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => setAction("read")}>
            Read NFC
          </button>
          <button className={`w-full transition-all duration-200 p-2 flex items-center justify-center rounded-md ${action === "write" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => setAction("write")}>
            Write NFC
          </button>
          <button className={`w-full transition-all duration-200 p-2 flex items-center justify-center rounded-md ${action === "erase" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => setAction("erase")}>
            Erase NFC
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
        {
          action == 'erase' && (
            <Eraser />
          )
        }
      </div>
    </main>
  );
};

export default NFCReaderWriter;
