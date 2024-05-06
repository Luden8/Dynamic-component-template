<script setup>
import {onMounted, ref} from 'vue'
import SmartCard from '@app/shared/SmartCard.vue'

let template = ref('')
let css = ref('')
let loading = ref(false)
const BASE_URL = 'http://localhost:3000'

onMounted(async () => {
  loading.value = true
  const  response = await fetch(`${BASE_URL}/template`)
  const templateData = await response.json()

  loading.value = false

  css.value = templateData.styles || templateData.styles.replace(/\\n/g, "\n").replace(/\\r/g, "\r")
  template.value = templateData.template || templateData.template.replace(/\\n/g, "\n").replace(/\\r/g, "\r")

})
</script>

<template>
  <div>
    <SmartCard image="https://picsum.photos/640/360" :template="template" :styles="css" :loading="loading">
    </SmartCard>
  </div>
</template>