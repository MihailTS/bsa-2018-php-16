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
  </form>
</template>

<script> 
  import { mapState } from 'vuex';
export default {
  computed:{
    ...mapState({
      users: function(state) {return state.users.users},
      album: function(state) {return state.albums.albums[this.$route.params.id]}
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