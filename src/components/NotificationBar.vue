<template>
   <div class="notification-bar" :class="notificationTypeClass">
      <p>{{ notification.message }}</p>
   </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },
  methods: {
    ...mapActions('notification', ['remove'])
  }
}
</script>

<style lang="css" scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
