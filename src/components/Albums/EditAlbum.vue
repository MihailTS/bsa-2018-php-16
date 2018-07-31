<template>
  <form>
      <label>Title<input v-model="editedAlbum.title" type="text" name="title"></label>
      <label>User ID
        <select v-model="editedAlbum.userId">
          <option v-for="user in users" v-bind:value="user.id">
            {{ user.name }}
          </option>
        </select>
      </label>
      <label>Preview URL<input v-model="editedAlbum.preview" type="text" name="preview"></label>
      <button type="button" @click.stop.prevent="saveAlbum">Save album</button>
      <button type="button" @click.stop.prevent="deleteAlbum">Delete album</button>
      <br><br>
      <h3>Add Photo:</h3>
      <label>Title<input v-model="newPhoto.title" type="text" name="title"></label>
      <label>Photo URL<input v-model="newPhoto.url" type="text" name="url"></label>
      <button type="button" @click.stop.prevent="savePhoto">Save photo</button>
      <br><br>
      <h3>Photos:</h3>
      <div style="display:flex;flex-wrap:wrap;">
        <div class="photo" v-for="photo in this.photos(album.id)">
          <img :src="photo.url">
          <p>{{photo.title}}</p>
        </div>
      </div>
  </form>
</template>

<script> 
  import { mapState, mapGetters } from 'vuex';
export default {
  data:function(){
    return {
      newPhoto:{
        title:"",
        url:"",
        albumId:this.$route.params.id
      }
    }
  },
  computed:{
    ...mapState({
      users: function(state) {return state.users.users},
      album: function(state) {return state.albums.albums[this.$route.params.id]}
    }),
    ...mapGetters({
      photos:"photosByAlbum"
    }),
    editedAlbum:function(){
      if(this.album){
        return {
          title:this.album.title,
          userId:this.album.userId,
          preview:this.album.preview
        }
      }else{
        return {
          title:"",
          userId:"",
          preview:""
        }
      }
    }
  },
  methods: {
    savePhoto: function() {
      this.$store.dispatch("addPhoto", this.newPhoto);
    },
    saveAlbum: function() {
      this.$store.dispatch("editAlbum", {
          id:this.$route.params.id,
          data:this.editedAlbum
        }
      );
      this.$router.go(-1);
    },
    deleteAlbum:function(){
      this.$store.dispatch('deleteAlbum', this.$route.params.id);
      this.$router.go(-1);
    }
  }
}
</script>

<style></style>