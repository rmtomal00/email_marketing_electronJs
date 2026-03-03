
export interface DataReturn{
  status: boolean,
  msg: string
}

export interface TestApiKey{
    status: boolean,
    msg: string
    userId: number,
    name: string,
    remainEmail: number 
}

export interface Report{
    err: boolean,
    totalSend: number,
    realSend: number,
    totalOpen: number,
    bounce: number,
    deferred: number,
    notOpen: number,
    message: string
}

export interface EmailReport{
    email: string,
    status: string,
    message: string
}

export interface EmailData{
    ApiKey: string,
    To: string,
    From: string,
    Content: string,
    Subject: string,
    IsHtml: boolean,
    UseTracker: boolean,
    BrandName: string
    ReplyTo: string
}

export interface EmailDataAttachment {
    ApiKey: string;
    To: string;
    From: string;
    Content: string;
    Subject: string;
    IsHtml: boolean;
    UseTracker: boolean;
    BrandName: string;
    ReplyTo: string;
    Files: FileData; // Use null if no attachment
}

export interface FileData {
    name: string;       // e.g., "invoice.pdf"
    type: string;       // e.g., "application/pdf"
    dataBuffer: Uint8Array; 
}