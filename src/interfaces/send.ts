import { FileData } from "./apicalls"

export interface PassEmailAllData{
    From: string,
    EmailList: string[]
    BrandName: string,
    IsTracker: boolean,
    Subject: string,
    Content: string,
    ApiKey: string,
    ReplyTo: string,
    FilesSend: FileData | null
}

export interface StoreLastSend{
    template: string,
    subject: string
}