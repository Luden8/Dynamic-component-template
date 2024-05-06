<script setup>
import {  h, useSlots, toRefs, onMounted, ref } from 'vue';
import defaultTemplate from './defaultTemplate';
import defaultStyles from './defaultStyles';
import useDynamicTemplate from "./useDynamicTemplate";
import ErrorBoundaries from "./ErrorBoundaries.vue";


// Define props
const props = defineProps({
  image: {
    type: String,
    default: null
  },
  template: {
    type: String,
    default: ''
  },
  styles: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const { image, template, styles, loading } = toRefs(props)

const slots = useSlots();

const { compiledTemplate } = useDynamicTemplate({
  template: [template, defaultTemplate],
  styles: [styles, defaultStyles],
});

const BASE_URL = 'http://localhost:3000'

let title = ref('')
let description = ref('')

onMounted(async () => {
  const response = await fetch(`${BASE_URL}/data`)
  const data = await response.json()
  title.value = data.title;
  description.value = data.description;

})
let DynamicComponent = () => {
  if (loading.value) {
    return h('div', null, 'loading....')
  }
  return h(compiledTemplate.value, {
    image: image.value,
    title: title.value,
    description: description,
    $slots: slots
  })
}


</script>
<template>
  <ErrorBoundaries>
    <DynamicComponent/>
  </ErrorBoundaries>
</template>