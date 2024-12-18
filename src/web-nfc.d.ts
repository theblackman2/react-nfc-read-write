/* eslint-disable @typescript-eslint/no-explicit-any */
// web-nfc.d.ts
interface NDEFReader {
  scan(): Promise<void>;
  write(message: string | NDEFMessageInit): Promise<void>;
  onreadingerror: ((this: NDEFReader, ev: Event) => any) | null;
  onreading: ((this: NDEFReader, ev: NDEFReadingEvent) => any) | null;
}

interface NDEFMessageInit {
  records: NDEFRecordInit[];
}

interface NDEFRecordInit {
  recordType: string;
  mediaType?: string;
  id?: string;
  data?: ArrayBuffer | string;
}

interface NDEFReadingEvent extends Event {
  message: NDEFMessage;
}

interface NDEFMessage {
  records: NDEFRecord[];
}

interface NDEFRecord {
  recordType: string;
  mediaType?: string;
  id?: string;
  data?: ArrayBuffer;
}

declare const NDEFReader: {
  prototype: NDEFReader;
  new (): NDEFReader;
};
