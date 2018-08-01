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
      <button class="btn" type="button" @click.stop.prevent="saveAlbum">Save album</button>
      <button class="btn red-btn" type="button" @click.stop.prevent="deleteAlbum">Delete album</button>
      <br><br>
      <h3>Add Photo:</h3>
      <label>Title<input v-model="newPhoto.title" type="text" name="title"></label>
      <label>Photo URL<input v-model="newPhoto.url" type="text" name="url"></label>
      <button class="btn" type="button" @click.stop.prevent="savePhoto">Save photo</button>
      <br><br>
      <h3>Photos:</h3>
      <div class="photos">
        <div class="photo" v-for="photo in this.photos(album.id)">
          <img :src="photo.url">
          <p>{{photo.title}}</p>
          <button class="btn red-btn delete-photo-btn" type="button" @click.stop.prevent="deletePhoto(photo.id)">Delete photo</button>
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
      users: function(state) {return state.users.users || {}},
      album: function(state) {return state.albums.albums[this.$route.params.id] || {}}
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
    deletePhoto: function(photoId) {
      this.$store.dispatch("deletePhoto", photoId);
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
    justify-content: space-between;
    overflow:hidden;
  } 
  .photo img{
    width:100px;
    height:100px;
  }
</style>