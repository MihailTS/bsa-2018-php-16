<template>
  <div>
    <div>Name: {{user && user.name}}</div>
    <div>Email: {{user && user.email}}></div>
    <div>Avatar URL: <img :src="user && user.avatar"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      user: function(state) {return state.users.users[this.$route.params.id]}
    }),
  
  },
}
</script>

<style></style>