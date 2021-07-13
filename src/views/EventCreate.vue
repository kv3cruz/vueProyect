

<template>
  <div>
    <h1>Create Event</h1>
      <p>{{user.user.name}}</p>
     <form @submit.prevent="createEvent">
          <BaseSelect label="Select a category" :options="categories" v-model="event.category"/>
          <h3>Name & describe your event</h3>
        
            <BaseInput label="Title" placeHolder="Title" type="text"  v-model="event.title" class="field"/>
            
            <BaseInput label="Description" placeHolder="Description" type="text"  v-model="event.description" class="field"/>

          <h3>Where is your event?</h3>
          <BaseInput label="Location" placeHolder="Location" type="text"  v-model="event.location" class="field"/>
         
          <h3>When is your event?</h3>
          <div class="field">
            <label>Date</label>
            <datepicker v-model="event.date" placeholder="Select a date" class="field"/>
          </div>
          <div class="field">
             <BaseSelect label="Select a time" :options="times" v-model="event.time" class="field"/>
          
          </div>
          <base-button buttonClass="-fill-gradient">Submit</base-button>
          </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import BaseInput from '../components/BaseInput.vue'
import BaseSelect from '../components/BaseSelect.vue'
import BaseButton from '../components/BaseButton.vue'
export default {
  components: {
    Datepicker,
    BaseInput,
    BaseSelect,
    BaseButton
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      event: this.createFreshEventObject()
    }
  },
  created() {},
  computed: {
    ...mapGetters(['getEventById']),
    ...mapState(['user', 'categories'])
  },
  methods: {
    createEvent() {
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(error => {
          console.log(error)
        })
    },
    createFreshEventObject() {
      //let me = this
      //const user = me.user != undefined ? me.user.user : ''
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 1000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>
