<template>
  <div>
    <div>Title: {{album.title}}</div>
    <div>User: <router-link :to="{ name: 'user', params:{id:album.userId} }">Edit{{user.name}}</router-link></div>
    <div>Preview: <img :src="album.preview"></div>
  </div>
</template>

<script> 
  import { mapState } from 'vuex';
export default {
  computed:{
    ...mapState({
      user: function(state) {return state.users.users[
        state.albums.albums[this.$route.params.id].userId
        ]},
      album: function(state) {return state.albums.albums[this.$route.params.id]}
    })
  }
}
</script>

<style></style>