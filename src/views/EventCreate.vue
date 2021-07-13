

<template>
  <div>
    <h1>Create Event</h1>
      <!--  <p>{{user.user.name}}</p>-->
     <form @submit.prevent="createEvent">
          <BaseSelect label="Select a category" 
          :options="categories" 
          v-model="event.category"
          @blur="$v.event.category.$touch()"
          :class="{ error: $v.event.category.$error }"
          />
          <template v-if="$v.event.category.$error">
            <p v-if="!$v.event.category.required" class="errorMessage">Category is required.</p>
          </template>
          <h3>Name & describe your event</h3>
        
            <BaseInput label="Title" placeHolder="Title" 
            type="text"  
            v-model="event.title" 
            class="field"            
            :class="{ error: $v.event.title.$error }"
            @blur="$v.event.title.$touch()"
            />
            <template v-if="$v.event.title.$error">
              <p v-if="!$v.event.title.required" class="errorMessage">Title is required.</p>
            </template>
            <BaseInput label="Description"
             placeHolder="Description"
              type="text"  
              v-model="event.description" 
              class="field"
              :class="{ error: $v.event.description.$error }"
              @blur="$v.event.description.$touch()"
              />
            <template v-if="$v.event.description.$error">
              <p v-if="!$v.event.title.description" class="errorMessage">Description is required.</p>
            </template>
          <h3>Where is your event?</h3>
          <BaseInput label="Location" placeHolder="Location"
           type="text"  
           v-model="event.location"
           class="field"
           :class="{ error: $v.event.location.$error }"
            @blur="$v.event.location.$touch()"
           />
          <template v-if="$v.event.location.$error">
              <p v-if="!$v.event.title.location" class="errorMessage">Location is required.</p>
            </template>
          <h3>When is your event?</h3>
          <div class="field">
            <div class="field">
                <label>Date</label>
                <datepicker
                  v-model="event.date"
                  placeholder="Select a date"
                  :input-class="{ error: $v.event.date.$error }"
                  @opened="$v.event.date.$touch()"
                />
              </div>

              <template v-if="$v.event.date.$error">
                <p v-if="!$v.event.date.required" class="errorMessage">Date is required.</p>
              </template>
          </div>
          <div class="field">
            <BaseSelect label="Select a time" 
            :options="times" 
            v-model="event.time" 
            class="field"
            :class="{ error: $v.event.time.$error }"
            @blur="$v.event.time.$touch()"
            />
            <template v-if="$v.event.time.$error">
              <p v-if="!$v.event.time.required" class="errorMessage">Time is required.</p>
            </template>
          </div>
          <base-button :disabled="$v.$anyError" buttonClass="-fill-gradient">Submit</base-button>
          <p v-if="$v.$anyError" class="errorMessage" >Please Fill out the required fields</p>
          </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import BaseInput from '../components/BaseInput.vue'
import BaseSelect from '../components/BaseSelect.vue'
import BaseButton from '../components/BaseButton.vue'
import { required } from 'vuelidate/lib/validators'
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
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
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
      }
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

<style lang="css" scoped>
.error
{
 border:2px solid red;
}
.errorMessage{
  color: red;
}
</style>
