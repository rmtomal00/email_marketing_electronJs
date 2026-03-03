<template>
  <div class="container mt-3 ">
    <Dialog 
    v-model:visible="visible" 
    v-model:title="title" 
    v-model:message="message" 
    />
    <ProgressBar :loading="visibleProgress"/>
    <div class="conatiner p-0 m-0">
      <h2>Settings Page</h2>
      <p>Configure your preferences here.</p>
    </div>
    <div class="container-sm d-flex flex-wrap justify-content-center align-middle gap-3">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">@</span>
        </div>
        <input v-model="email" type="email" class="form-control" placeholder="Mail Send From" aria-label="email" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <KeyIcon style="width: 15px; height: 25px;" />
          </span>
        </div>
        <input v-model="api_key" type="password" class="form-control" placeholder="Api Key" aria-label="email" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <BuildingOfficeIcon style="width: 15px; height: 25px;" />
          </span>
        </div>
        <input v-model="company_name" type="text" class="form-control" placeholder="Company Name" aria-label="email" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <InboxIcon style="width: 15px; height: 25px;" />
          </span>
        </div>
        <input v-model="replyTo" type="email" class="form-control" placeholder="Reply To" aria-label="email" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <ClockIcon style="width: 15px; height: 25px;" />
          </span>
        </div>
        <input v-model="limit" type="number" class="form-control" placeholder="Send/Minutes" aria-label="email" aria-describedby="basic-addon1">
      </div>
    </div>
    <div class="container-sm d-flex justify-content-center flex-row gap-3 mt-2">
      <button v-on:click="check" type="button" class="btn btn-outline-warning">Test</button>
      <button v-on:click="saveAllUserDtata" type="button" class="btn btn-outline-success">Save</button>
    </div>
    <div class="container d-flex justify-content-center mt-2">
      <Status
      :visible="visibleStatus"
      :type="indicator"
      :message="msgStatus"
    />
    </div>
  </div>
</template>

<script setup lang="ts">
import { KeyIcon, BuildingOfficeIcon, ClockIcon, InboxIcon } from '@heroicons/vue/24/outline'; 
import Dialog from '../components/Dialog.vue';
import { ref, onMounted } from 'vue';
import { useAppStore } from '../store/userInfo';
import { StoreNames } from '../enums/storeTypes';
import Status from '../components/Status.vue';
import {Data} from '../interfaces/settings'
import { sendMailTest, testApiKey } from '../datacall/callEmailapi';
import ProgressBar from '../components/ProgressBar.vue'

const visible = ref(false)
const message = ref('')
const title = ref('')

const email = ref('')
const api_key = ref('')
const company_name = ref('')
const limit = ref(0)
const id = ref()
const replyTo = ref('')
const storeData = useAppStore();

const visibleStatus = ref(false)
const msgStatus = ref('')
const indicator = ref('')

const testStatus = ref(false)
const visibleProgress = ref(false)


onMounted(async ()=>{
  const data = await storeData.load(StoreNames.UserInfo)
  console.log(data)
  if(!data){
    return
  }
  const retiveData = data as Data;
  if(retiveData.email){
    email.value = retiveData.email
  }
  if(retiveData.api_key){
    api_key.value = retiveData.api_key
  }
  if (retiveData.companyName) {
    company_name.value = retiveData.companyName
  }
  if (retiveData.replyTo) {
    replyTo.value = retiveData.replyTo
  }
  if(retiveData.limit){
    limit.value = retiveData.limit
  }
  if(retiveData.userId){
    id.value = retiveData.userId
  }
})


async function check(){
  title.value = "Field Error"
  if (!checkEmail(email.value)) {
    visible.value = true
    message.value = "Invalid Email. Please add a business email."
    return
  }

  if(!api_key.value) {
    visible.value = true
    message.value = "Invalid Api Kye. Please take a Api Key from SenderX dashboard."
    return
  }

  if(!company_name.value) {
    visible.value = true
    message.value = "Invalid Company Name. Please add company name."
    return
  }

  if(!checkEmail(replyTo.value)) {
    visible.value = true
    message.value = "Invalid Reply To email. Please add a valid email."
    return
  }

  if(limit.value <= 0|| limit.value > 100) {
    visible.value = true
    message.value = "Invalid email sending limit. Please set send/minutes 1 to 100"
    return
  }
  visibleProgress.value = true
  const checkApiKey = await testApiKey(api_key.value)
  if(!checkApiKey.status){
    visibleProgress.value = false
    visible.value = true
    message.value = checkApiKey.msg
    return
  }
  id.value = checkApiKey.userId;

  const emailStatus = await sendMailTest(api_key.value, "senderxmarketingapp@senderx.link", email.value, "Test email form email marketing app", "SenderX Marketing APP", false, false, "SenderX");
  
  if(emailStatus.status){
    visibleProgress.value = false
    visible.value = true
    message.value = emailStatus.msg
    return
  }
  visibleProgress.value = false;
  visibleStatus.value = true
  indicator.value = "success"
  msgStatus.value = "We have check your info. Please click on save button for save the data"
  testStatus.value = true
}

async function saveAllUserDtata() {

  if(!testStatus.value){
    title.value = "Not Tested"
    visible.value = true
    message.value = "Please first click on test button."
    return
  }

  await savedata();

  visibleStatus.value = true
  indicator.value = "success"
  msgStatus.value = "All configuration is saved successfully."
  
}

function checkEmail(email: String): boolean{
  if(!email) return false
  if(!email.includes('@')) return false
  const domain = email.split('@')[1];
  if(!domain || !domain.includes('.')) return false
  return true
}

async function savedata(): Promise<boolean>{
  const data: Data = {
    email: email.value,
    api_key: api_key.value,
    companyName: company_name.value,
    replyTo: replyTo.value,
    limit: limit.value,
    userId: id.value
  }

  await storeData.save(StoreNames.UserInfo, data);
  return true;
}

</script>
