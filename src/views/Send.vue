<template>
  <div class="container mt-3">
    <Dialog v-model:visible="dVisiable" v-model:message="dMessage" v-model:title="dTitle" />
    <ProgressBar :loading="progressBar"/>
    <h2>Send Mail</h2>
    <p class="" style="font-family: serif; font-size: 20px;">Send mail with SenderX service with cheap price.</p>
    <div class="card p-1 mb-3">
      <p style="padding: 0px 0px 6px 0px; margin: 0; font-family: serif;">Select Email List(TXT or DOCX)</p>
      <div class="input-group">
        <input type="file" @change="loadData" accept=".txt, .docx" class="form-control" placeholder="Select email list docx, txt" aria-label="email" aria-describedby="basic-addon1">
      </div>
    </div>

    <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <PencilSquareIcon style="width: 20px; height: 25px;" />
          </span>
        </div>
        <input type="text" v-model="subject" class="form-control" placeholder="Subject" aria-label="email" aria-describedby="basic-addon1">
      </div>
    <div class="container-sm">
      <div class="form-check">
        <input 
          class="form-check-input" 
          type="checkbox" 
          v-model="isCheck" 
          id="check1"
        >
        <label class="form-check-label" for="check1">
          Enable tracker
        </label>
      </div>
    </div>
    <div class="card p-1 mt-3">
      <p class="p-1">Email Body</p>
      <div class="mt-0">
        <Editor 
          @load="onEditorLoad" 
          v-model="d" 
          editorStyle="height: 320px" 
        />
      </div>
    </div>
    <div class="card p-1 mt-3 mb-3">
      <p style="padding: 0px 0px 6px 0px; margin: 0; font-family: serif;">Select attachment</p>
      <div class="input-group">
        <input type="file" @change="handleChangeFile" accept=".jpg,.jpeg,.png,.pdf, .docx, .gdoc, .txt, .doc" class="form-control" placeholder="Select email list docx, txt" aria-label="email" aria-describedby="basic-addon1">
      </div>
    </div>
    <div class="mb-3 mt-3">
      <button @click="datal" class="btn btn-secondary">Get Full Styled HTML</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Editor from 'primevue/editor'
import Quill from 'quill'
import { PencilSquareIcon } from '@heroicons/vue/24/outline';
import { readTxtFile, readDocxFile } from '../services/readFile';
import Dialog from '../components/Dialog.vue';
import ProgressBar from '../components/ProgressBar.vue';
import { useRouter } from 'vue-router'

import { useAppStore } from '../store/userInfo';
import { usePassEmailData } from '../store/passData';
import { StoreNames } from '../enums/storeTypes';
import { Data } from '../interfaces/settings';
import { PassEmailAllData } from '../interfaces/send';
import { FileData } from '../interfaces/apicalls';
/** * TypeScript Fix: 
 * Quill.import returns 'unknown' by default. We cast to 'any' to 
 * allow Quill.register to accept the definition.
 */
const AlignStyle = Quill.import('attributors/style/align') as any;
const FontStyle = Quill.import('attributors/style/font') as any;
const SizeStyle = Quill.import('attributors/style/size') as any;

Quill.register(AlignStyle, true);
Quill.register(FontStyle, true);
Quill.register(SizeStyle, true);

const useAppData = useAppStore();
const passDataEmail = usePassEmailData()
const router = useRouter()

const quill = ref<any>(null)
const d = ref('') 
const emailListFile = ref<File | null>(null);

const dVisiable = ref(false);
const dTitle = ref("Error")
const dMessage = ref('')

const progressBar = ref(false);

const emailLists = ref<Array<string>>([]);
const value = ref('');
const subject = ref('')
const isCheck = ref(false);
const fileUpload = ref<File | null>(null)

const onEditorLoad = ({ instance }: { instance: any }) => {
  quill.value = instance
}

/**
 * Removes internal Quill markers and ensures standard HTML structure.
 */
const getCleanHtml = () => {
  if (!quill.value) return d.value;

  const rawHtml = quill.value.root.innerHTML;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = rawHtml;

  // 1. Remove the <span class="ql-ui"> that you were seeing
  const uiElements = tempDiv.querySelectorAll('.ql-ui');
  uiElements.forEach(el => el.remove());

  // 2. Ensure lists look right in email clients without Quill CSS
  const listItems = tempDiv.querySelectorAll('li');
  listItems.forEach(li => {
    // If it's a bullet list, ensure a bullet style is visible
    if (li.getAttribute('data-list') === 'bullet') {
      li.style.listStyleType = 'disc';
    }
  });

  return tempDiv.innerHTML;
}

async function emailList(){
  if (!emailListFile.value) {
    dTitle.value = "Input Error"
    dMessage.value = "Please select a only TXT or DOCX file as email list."
    progressBar.value = false
    dVisiable.value = true;
    //alert("Only TXT or DOCX allowed");
    return;
  }
  const allowedTypes = [
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  const file = emailListFile.value as File;
  if (!allowedTypes.includes(file.type)) {
    dTitle.value = "Input Error"
    dMessage.value = "Please select a only TXT or DOCX file as email list."
    progressBar.value = false
    dVisiable.value = true;
    //alert("Only TXT or DOCX allowed");
    return;
  }

  if(file.type === "text/plain"){
    const emails = await readTxtFile(file);
    emailLists.value = emails;
    return
  }
  emailLists.value = await readDocxFile(file);
}

function handleChangeFile(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    fileUpload.value = target.files[0];
  }
}

const datal = async () => {
  value.value = getCleanHtml();
  if(!subject.value){
    dTitle.value = "Input Error"
    dMessage.value = "You need to give a subject."
    dVisiable.value = true;
    return;
  }
  if(!value.value){
    dTitle.value = "Input Error"
    dMessage.value = "You need to write something in body."
    dVisiable.value = true;
    return;
  }
  progressBar.value = true
  await emailList();

  const getCradiantial = await useAppData.load(StoreNames.UserInfo) as Data
  if (!getCradiantial.api_key || !getCradiantial.companyName || !getCradiantial.replyTo || !getCradiantial.email){
    dTitle.value = "Setting not setup"
    dMessage.value = "You don't setup data on setting. Please go to the settings and setup the data."
    dVisiable.value = true;
    return;
  }

  const file = fileUpload.value ? (fileUpload.value as File) : null;
  
  //navivate to the next page
  const passdata:PassEmailAllData = {
    From: getCradiantial.email,
    EmailList: emailLists.value,
    Subject: subject.value,
    Content: value.value,
    IsTracker: isCheck.value,
    ApiKey: getCradiantial.api_key,
    BrandName: getCradiantial.companyName,
    ReplyTo: getCradiantial.replyTo,
    FilesSend: !file ? null : {
      name: file.name,
      type: file.type,
      dataBuffer: new Uint8Array(await file.arrayBuffer()) 
    } as FileData
  }
  progressBar.value = false
  passDataEmail.setData(passdata);
  router.push({name: 'SendStart'})
}

function loadData(e: any){
  emailListFile.value = e.target.files[0];
}

</script>