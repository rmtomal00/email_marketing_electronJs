import { FileData } from "../../interfaces/apicalls"

export interface WorkerReq{
    action: boolean,
    emailList: Array<string>
    emailBody: string
    emailSubject: string
    apiKey: string
    isTracker: boolean
    file: FileData|null
    from: string
    brandName: string
    replyTo: string
} 