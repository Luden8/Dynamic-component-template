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

async function handleSubmit() {
  const body = {
    template: template.value,
    styles: css.value,
  }

  const response = await fetch('http://localhost:3000/template', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  console.log(data)
}
</script>

<template>
  <main>
    <div class="wrapper">
      <div class="layout">
        <div class="editor">
          <form action="" @submit.prevent="handleSubmit">
            <div class="section">
              <h2>Template</h2>
              <textarea v-model="template" class="textarea-control"></textarea>
            </div>
            <div class="section">
              <h2>CSS</h2>
              <textarea v-model="css" class="textarea-control"></textarea>
            </div>
            <button class="button" :disabled="loading">{{ loading  ? 'Loading' : 'Save' }}</button>
          </form>
        </div>
        <div class="preview">
          <SmartCard image="https://picsum.photos/640/360" :template="template" :styles="css" :key="template" :loading="loading">
            <template #title>{{ title }}</template>
            {{ description }}
          </SmartCard>
          {{ template }}
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.wrapper {
  max-width: 1200px;
  margin: auto;
  padding-top: 40px;
}
.layout {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
}

.section {
  margin-bottom: 40px;
}



.textarea-control {
  width: 100%;
  height: 200px;
}

.button {
  padding: 10px 25px;
  font-size: 16px;
  background-color: #6d64de;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px
}
</style>