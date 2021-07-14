<template>
   <div>
      <label v-if="label">{{ label }}</label>
      <select :value="value" @change = "updateValue"  v-bind="$attrs" v-on="$listeners">
          <option v-for="option in options" :key="option" :selected="option === value">{{ option }}</option>
      </select>
   </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin'
export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      require: true
    }
  }
}
</script>

<style lang="css" scoped>

</style>
