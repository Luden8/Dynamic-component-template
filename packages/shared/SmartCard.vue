<script setup>
import {  h, useSlots, toRefs } from 'vue';
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
let DynamicComponent = () => {
  if (loading.value) {
    return h('div', null, 'loading....')
  }
  return h(compiledTemplate.value, {
    image: image.value,
    $slots: slots
  })
}


</script>
<template>
  <ErrorBoundaries>
    <DynamicComponent/>
  </ErrorBoundaries>
</template>