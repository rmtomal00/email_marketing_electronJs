<template>
  <div class="container-fluid m-0">
    <Dialog v-model:visible="dVisible" v-model:title="dTitle" v-model:message="dMessage"/>
    <div class="container d-flex flex-wrap justify-content-center gap-2">
      <Button icon="pi pi-pause" severity="warn" @click="pauseFunc" rounded variant="outlined" aria-label="Pause" :size="size" /> 
      <Button icon="pi pi-play" severity="success" @click="runFunc" rounded variant="outlined" aria-label="Start" :size="size" />
      <Button icon="pi pi-times" severity="danger" @click="cancelFunc" rounded variant="outlined" aria-label="Cancel" :size="size" />
    </div>
    <div v-if="progress" class="container d-flex flex-row justify-content-center align-item-center mt-3">
      <ProgressSpinner  style="width: 30px; height: 30px" strokeWidth="6" fill="transparent"
            animationDuration=".8s" aria-label="Custom ProgressSpinner"/>
    </div>
    <div class="card mt-3 p-3">
      <DataTable 
        :value="products" 
        scrollable 
        scrollHeight="600px"
      >
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" />
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRaw } from 'vue'
import { DataTable, Column, ProgressSpinner } from 'primevue'
import { WorkerReq } from '../workers/emailSending/interface'
import Dialog from '../components/Dialog.vue'
import { usePassEmailData } from '../store/passData'
import { PassEmailAllData } from '../interfaces/send'
import { FileData } from '../interfaces/apicalls'
import { useRouter } from 'vue-router'


const data = usePassEmailData()
const router = useRouter()
const size = ref('normal')
const products = ref<any[]>([])

//dialog
const dVisible = ref(false)
const dTitle = ref("")
const dMessage = ref('')

// status manage button
const pause = ref(false)
const run = ref(true);


const progress = ref(true)

const userData = data.emailData as PassEmailAllData

var emailLists = toRaw(userData.EmailList)


function pauseFunc(){
  if(pause.value){
    showDialog(true, "Email Sending Status", "Your task is already paused.")
    return
  }
  
  window.ipcRenderer.off('worker-message', onWorkerMessage)
  window.ipcRenderer.off('worker-exit', onWorkerExit)
  stopEmailWorker(false);

  pause.value = true 
  run.value = false
}

function runFunc(){
  if(emailLists.length < 1) {
    showDialog(true, "Email Sending Status", "Your task is already finished.")
    return
  }
  progress.value = true
  if(run.value){
    showDialog(true, "Email Sending Status", "Your task is already running.")
    return
  }
  window.ipcRenderer.removeAllListeners('worker-message')
  window.ipcRenderer.removeAllListeners('worker-exit')

  window.ipcRenderer.on('worker-message', onWorkerMessage)
  window.ipcRenderer.on('worker-exit', onWorkerExit)
  sendEmailBg(emailLists, userData.Content, userData.Subject,
    userData.ApiKey, userData.IsTracker, userData.From, userData.BrandName, userData.ReplyTo, userData.FilesSend
  )
  pause.value = false 
  run.value = true
}

function cancelFunc(){
  router.push({name: 'Send'})
}

const onWorkerMessage = (_event: any, message: any) => {
  emailLists = emailLists.filter(map => map != message.email)
  products.value.push(message)
}

const onWorkerExit = (_event: any, data: any) => {
  console.log(data);
  
  progress.value = false
  showDialog(true, "Email Sending Status", "Email sending task is finished/paused successfull.")

}

onMounted(() => {

  window.ipcRenderer.removeAllListeners('worker-message')
  window.ipcRenderer.removeAllListeners('worker-exit')

  window.ipcRenderer.on('worker-message', onWorkerMessage)
  window.ipcRenderer.on('worker-exit', onWorkerExit)
  sendEmailBg(emailLists, userData.Content, userData.Subject,
    userData.ApiKey, userData.IsTracker, userData.From, userData.BrandName, userData.ReplyTo, userData.FilesSend
  )
})

onUnmounted(() => {
  window.ipcRenderer.off('worker-message', onWorkerMessage)
  window.ipcRenderer.off('worker-exit', onWorkerExit)

  stopEmailWorker(true)
})

const columns = [
  { field: 'email', header: 'Email' },
  { field: 'status', header: 'Status' },
  { field: 'message', header: 'Message' },
]

// ------------------ WORKER ------------------

function startEmailWorker(emails: WorkerReq) {
  window.ipcRenderer.invoke('worker-start', emails)
}

function stopEmailWorker(clr:boolean) {
  window.ipcRenderer.invoke('worker-stop')
  if(clr){
    data.clearAll()
  }
}

// ------------------ TEST ------------------

function sendEmailBg(emails: string[], body: string, sub:string,
  key:string, tracker: boolean, form: string, name:string, reply:string, fileData: FileData|null) {
  const data: WorkerReq = {
    action: true,
    emailList: [...emails],
    emailBody: body,
    emailSubject: sub,
    apiKey: key,
    isTracker: tracker,
    from: form,
    brandName: name,
    replyTo: reply,
    file: fileData ? toRaw(fileData) : null
  }

  startEmailWorker(data)
}

function showDialog(show: boolean, title: string, message: string){
  dVisible.value = show;
  dTitle.value = title;
  dMessage.value = message;
}
</script>