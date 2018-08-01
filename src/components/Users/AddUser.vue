<template>
  <form>
      <label>Name<input v-model="newUser.name" type="text" name="name"></label>
      <label>Email<input v-model="newUser.email" type="email" name="email"></label>
      <label>Avatar URL<input v-model="newUser.avatar" type="text" name="avatar"></label>
      <button class="btn" type="button" @click.stop.prevent="saveUser">Save user</button>
  </form>
</template>

<script> 
export default {
  data: function(){
    return {
      newUser:{
        name:"",
        email:"",
        avatar:""
      }
    }
  },
  methods: {
    saveUser: function() {
      this.$store.dispatch("addUser",this.newUser);
      this.$router.go(-1);
    }
  }
}
</script>

<style></style>