<template>
   <div>
      <h1>uh-oh!</h1>
      <h3>It looks like  you are experiencing some network issues, please click the back button and try again </h3>
      <router-link :to = " {name: 'event-list'} "> Go back to the home page</router-link>
   </div>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>

</style>
