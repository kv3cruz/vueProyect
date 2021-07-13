<template>
   <div>
      <h1>Ooops </h1>
      <h3>The {{ resource }} you are looking for is not here</h3>
      <router-link :to = "{ name: 'event-list'}">Back to the home page</router-link>
   </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="css" scoped>
</style>
