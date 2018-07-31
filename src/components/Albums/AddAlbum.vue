<template>
  <form>
      <label>Title<input v-model="newAlbum.title" type="text" name="title"></label>
      <label>User ID<input v-model="newAlbum.userId" type="text" name="userId"></label>
      <label>Preview URL<input v-model="newAlbum.preview" type="text" name="preview"></label>
      <button type="button" @click.stop.prevent="saveAlbum">Save album</button>
  </form>
</template>

<script> 
export default {
  data: function(){
    return {
      newAlbum:{
        title:"",
        userId:"",
        preview:""
      }
    }
  },
  methods: {
    saveAlbum: function() {
      this.$store.dispatch("addAlbum",this.newAlbum);
      this.$router.go(-1);
    }
  }
}
</script>

<style></style>