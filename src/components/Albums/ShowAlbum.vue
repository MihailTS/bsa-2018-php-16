<template>
  <div>
    <div>Title: {{album.title}}</div>
    <div>User: <router-link :to="{ name: 'user', params:{id:album.userId} }">Edit{{user.name}}</router-link></div>
    <div>Preview: <img :src="album.preview"></div>
    <div>Photos:</div>
    <div style="display:flex;flex-wrap:wrap;">
      <div class="photo" v-for="photo in this.photos(album.id)">
        <img :src="photo.url">
        <p>{{photo.title}}</p>
      </div>
    </div>
  </div>
</template>

<script> 
  import { mapState, mapGetters } from 'vuex';
export default {
  computed:{
    ...mapState({
      user: function(state) {return state.users.users[
        state.albums.albums[this.$route.params.id].userId
        ]},
      album: function(state) {return state.albums.albums[this.$route.params.id]}
    }),
    ...mapGetters({
      photos:"photosByAlbum"
    })
  }
}
</script>

<style>
 .photo{
    width:200px;
   overflow:hidden;
   justify-content: center;
   align-content: center
 } 
  .photo img{
    width:200px;
    height:200px;
  }
</style>