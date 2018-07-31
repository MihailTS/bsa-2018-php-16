<template>
  <div>
    <select :value="filterByUserId" @input.trim="updateFilter">
        <option value="">All</option>
        <option v-if="user" v-for="user in this.users" v-bind:value="user.id">
          {{ user.name }}
        </option>
    </select>
    <router-link :to="{ name: 'album-add'}">ADD ALBUM</router-link>
    <table class="albums-table striped">
      <thead>
          <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Preview Image</th>
              <th>User</th>
              <th></th>
              <th></th>
          </tr> 
      </thead>
      <tr v-for="album in this.albums" :key="album.id">
          <td>{{album.id}}</td>
          <td><router-link :to="{ name: 'album', params:{id:album.id} }">{{album.title}}</router-link></td>
          <td><img :src="album.preview"/></td>
          <td>
            <router-link :to="{ name: 'user', params:{id:album.userId} }">{{albumsOwner(album.userId).name}}</router-link>
          </td>
          <td><router-link :to="{ name: 'album-edit', params:{id:album.id} }">Edit</router-link></td>
          <td><button @click="deleteAlbum(album.id)">Delete</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapState({
      filterByUserId: state => state.albums.filterByUserId
    }),
    users: function(){
      return this.$store.state.users.users
    },
    ...mapGetters({
        albums:'filteredAlbums',
        albumsOwner:'albumsOwner'
    })
  },
  methods: {
    updateFilter(filter){   
      this.$store.dispatch('changeAlbumsFilter', filter.target.value);
    },
    deleteAlbum(albumId){
      this.$store.dispatch('deleteAlbum', albumId);
    }
  }
}
</script>

<style></style>