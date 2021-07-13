<template>
   <form @submit.prevent="submit">
      <input type="email" placeholder="What is your email" v-model="email" @blur="$v.email.$touch" :class="{ error: $v.email.$error }">

      <div v-if="$v.email.$error">
         <p v-if="!$v.email.email" class="errorMessage">Please enter a valid email</p>
         <p v-if="!$v.email.required" class="errorMessage">Email is required</p>
      </div>
      <button :disabled="$v.$invalid">Submit</button>
      <p v-if="$v.$anyError" class="errorMessage" >Please Fill out the required fields</p>
   </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: null
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    submit() {
      if (!this.$v.$invalid) {
        console.log('Form submitted')
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
