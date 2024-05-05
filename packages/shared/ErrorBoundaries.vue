<template>
  <div v-if="error">Error occured: {{ errorMessage }}</div>
  <div v-else><slot></slot></div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      errorMessage: '',
    };
  },
  errorCaptured(error, vm, info) {
    console.log(error)
    this.error = error;
    this.errorMessage = info;
    return false; // Prevents the error from propagating further
  },
};
</script>