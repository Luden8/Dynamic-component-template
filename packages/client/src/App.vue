<script setup>
import {onMounted, ref} from 'vue'
import SmartCard from '@app/shared/SmartCard.vue'

let title = ref('my title')
let description = ref('test description')
let template = ref('')
let css = ref('')
let loading = ref(false)
const BASE_URL = 'http://localhost:3000'

onMounted(async () => {
  loading.value = true
  const [ responseTemplate, responseData ] =  await Promise.all([
    fetch(`${BASE_URL}/template`),
    fetch(`${BASE_URL}/data`),
  ])
  const templateData = await responseTemplate.json()
  const data = await responseData.json()
  loading.value = false

  title.value = data.title;
  description.value = data.description;



  css.value = templateData.styles || templateData.styles.replace(/\\n/g, "\n").replace(/\\r/g, "\r")
  template.value = templateData.template || templateData.template.replace(/\\n/g, "\n").replace(/\\r/g, "\r")

})
</script>

<template>
  <div>
    <SmartCard image="https://picsum.photos/640/360" :template="template" :styles="css" :loading="loading">
      <template #title>{{ title }}</template>
      {{ description }}
    </SmartCard>
  </div>
</template>