<template>
  <form>
      <label>Title<input v-model="newAlbum.title" type="text" name="title"></label>
      <label>User ID
        <select v-model="newAlbum.userId">
          <option v-for="user in users" v-bind:value="user.id">
            {{ user.name }}
          </option>
        </select>
      </label>
      <label>Preview URL<input v-model="newAlbum.preview" type="text" name="preview"></label>
      <button class="btn" type="button" @click.stop.prevent="saveAlbum">Save album</button>
  </form>
</template>

<script> 
  import { mapState } from 'vuex';
export default {
  computed:mapState({
      users: function(state) {return state.users.users}
  }),
  data: function(){
    return {
      newAlbum:{
        title:"",
        userId:1,
        preview:""
      }
    }
  },
  methods: {
    saveAlbum: function() {
      this.$store.dispatch("addAlbum",this.newAlbum);
      this.$router.push({name:'albums'});
    }
  }
}
</script>

<style></style>