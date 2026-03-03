<template>
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px 0px 0px 0px;">
    <Dialog 
    v-model:visible="visible" 
    v-model:title="title" 
    v-model:message="message" 
    />
    <ProgressBar :loading="visibleProgress"/>
    <div class="container">
      <p style="font-size: 40px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bolder; padding: 0px; margin: 0px; line-height: 1; color: darkcyan;">Welcome to <span style="color: blue;">SenderX</span> Email Marketing</p>
      <p >We giving only 1000 mail for 15 cent.</p>
    </div>

    <div class="conatiner d-flex flex-wrap gap-5 justify-content-center">
      <div class="card" style="width: 250px; height: 160px; background-color: black;">
        <div class="card-body">
          <h5 class="card-title" style="color: white; text-align: center;">Credits</h5>
          <p class="card-text" style="color: white;">Total balance which remain for email.</p>
          <div style="display: flex; width: 216px; height: 30px; background-color: white; border-radius: 10px; justify-content: center; align-items: center;">
            <p style="padding-top: 20px; color: blue;">{{ remainEmails.toFixed(2) }}</p>
          </div>
        </div>
      </div>
      <div class="card" style="width: 250px; height: 160px; background-color: black;">
        <div class="card-body">
          <h5 class="card-title" style="color: white; text-align: center;">Total Send</h5>
          <p class="card-text" style="color: white;">Last 30 days how many email you have send.</p>
          <div style="display: flex; width: 216px; height: 30px; background-color: white; border-radius: 10px; justify-content: center; align-items: center;">
            <p style="padding-top: 20px; color: blue;">{{ totalSend }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container d-flex justify-content-center mt-3">
      <Chart :sent="send" :bounced="bounce" :deferred="defer"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Chart from '../components/Chart.vue';
import ProgressBar from '../components/ProgressBar.vue';
import { report30Days, testApiKey } from '../datacall/callEmailapi';
import { useAppStore } from '../store/userInfo';
import { StoreNames } from '../enums/storeTypes';
import { Data } from '../interfaces/settings';
import Dialog from '../components/Dialog.vue';


const saveUserData = useAppStore()

const visibleProgress = ref(false)

const visible = ref(false)
const title = ref('')
const message = ref('')

const totalSend = ref(100)
const send = ref(80)
const bounce = ref(18)
const defer = ref(2)

const remainEmails = ref(0)


onMounted(async()=>{
  const userData = await saveUserData.load(StoreNames.UserInfo);
  if (!userData) {
    showdialog(true,
      "No data found",
      "You have not configure the application. Please go to the setting and configure all settings."
    )
    return
  }
  const modeData = userData as Data;
  if(!modeData.api_key){
    showdialog(true,
      "No API key found",
      "You have not configure the application. Please go to the setting and configure all settings."
    )
    return
  }
  visibleProgress.value = true
  const profileData = await testApiKey(modeData.api_key);
  if (!profileData.status) {
    showdialog(true,
      "Invaid API Key",
      "Your provide API Key is may be removed. Please go to the setting and add a new API Key."
    )
    return
  }

  remainEmails.value = profileData.remainEmail

  const reportData = await report30Days(modeData.api_key)
  if(reportData.err){
    showdialog(true, "Report problem", reportData.message)
    return
  }
  totalSend.value = reportData.totalSend
  send.value = reportData.realSend,
  bounce.value = reportData.bounce
  defer.value = reportData.deferred

  visibleProgress.value = false
})

function showdialog(vsible: boolean, titleData: string, msg: string){
  visibleProgress.value = false
  visible.value = vsible;
  title.value = titleData
  message.value = msg
}
</script>
