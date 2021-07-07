<template>
  <div>
    <div class="event-header">
      <p>{{user.name}}</p>
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer ? event.organizer.name : '' }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>

    <BaseIcon name="map"><h2>Location</h2></BaseIcon>

    <address>{{ event.location }}</address>

    <h2>Event details</h2>
    <p>{{ event.description }}</p>

    <h2>Attendees
      <span class="badge -fill-gradient">{{ event.attendees ? event.attendees.length : 0 }}</span>
    </h2>
    <ul class="list-group">
      <li v-for="(attendee, index) in event.attendees" :key="index" class="list-item">
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
    <div>
      <input type="text" v-model="userNew">
      <button @click="actualizarUsuario" class="block">enviar</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['id'],
  created() {
    this.fetchEvent(this.id)
  },
  data() {
    return {
      userNew: ''
    }
  },
  computed: {
    ...mapState({
      event: state => state.event.event,
      user: state => state.user.user
    })
  },
  methods: {
    ...mapActions('event', ['fetchEvent']),
    ...mapActions('user', ['updateUser']),
    actualizarUsuario() {
      let usr = {
        name: this.userNew,
        id: '1010'
      }
      this.updateUser(usr)
    }
  }
}
</script>
<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
.block {
  display: block;
  width: 100%;
  border: none;
  background-color: #04aa6d;
  color: white;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}
</style>
