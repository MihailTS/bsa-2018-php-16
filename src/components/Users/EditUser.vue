<template>
  <form>
      <label>Name<input v-model="editedUser.name" type="text" name="name"></label>
      <label>Email<input v-model="editedUser.email" type="email" name="email"></label>
      <label>Avatar URL<input v-model="editedUser.avatar" type="text" name="avatar"></label>
      <button class="btn" type="button" @click.stop.prevent="saveUser">Save user</button>
      <button class="btn red-btn" type="button" @click.stop.prevent="deleteUser">Delete user</button>
  </form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      user: function(state) {return state.users.users[this.$route.params.id]}
    }),
    editedUser:function(){
      if(this.user){
        return {
          name:this.user.name,
          email:this.user.email,
          avatar:this.user.avatar
        }
      }else{
        return {
          name:"",
          email:"",
          avatar:""
        }
      }
    }
  },
  methods: {
    saveUser: function() {
      this.$store.dispatch("editUser", {
          id:this.$route.params.id,
          data:this.editedUser
        }
      );
      this.$router.push({name:'users'});
    },
    deleteUser: function(){
      this.$store.dispatch('deleteUser', this.$route.params.id);
      this.$router.push({name:'users'});
    }
  }
}
</script>

<style></style>