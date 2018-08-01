<template>
  <div>
    <div>Title: {{album.title}}</div>
    <div>User: <router-link :to="{ name: 'user', params:{id:album.userId} }">Edit{{user.name}}</router-link></div>
    <div>Preview: <img :src="album.preview"></div>
    <h3>Photos:</h3>
    <div class="photos">
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
      user: function(state) {
        return state.users.users[
          this.album.userId
        ] || {};
      },
      album: function(state) {
        return state.albums.albums[this.$route.params.id] || {};
      }
    }),
    ...mapGetters({
      photos:"photosByAlbum"
    })
  }
}
</script>

<style>
  .photos{
    display:flex;
    flex-wrap:wrap;
  }
  .photo{
    margin:5px 2px;
    width:100px;
    height:300px;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow:hidden;
  } 
  .photo img{
    width:100px;
    height:100px;
  }
</style>