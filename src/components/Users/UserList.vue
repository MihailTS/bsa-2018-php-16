<template>
  <div>
    <input placeholder="SERCH..." :value="filter" @input.trim="updateFilter">
    <router-link :to="{ name: 'user-add'}">ADD USER</router-link>
    <table class="users-table striped">
      <thead>
          <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>avatar</th>
              <th></th>
              <th></th>
          </tr>
      </thead>
      <tr v-for="user in this.users" :key="user.id">
          <td>{{user.id}}</td>
          <td><router-link :to="{ name: 'user', params:{id:user.id} }">{{user.name}}</router-link></td>
          <td>{{user.email}}</td>
          <td><img :src="user.avatar"/></td>
          <td><router-link :to="{ name: 'user-edit', params:{id:user.id} }">Edit</router-link></td>
          <td><button @click="deleteUser(user.id)">Delete</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapState({
      filter: state => state.users.filter
    }),
    ...mapGetters({
        users:'filteredUsers'
    })
  },
  methods: {
    updateFilter(filter){   
      this.$store.dispatch('changeFilter', filter.target.value);
    },
    deleteUser(userId){
      this.$store.dispatch('deleteUser', userId);
    }
  },
  mounted(){
    this.$store.dispatch('init');
  }
}
</script>

<style></style>