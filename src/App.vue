<template>
  <div id="app">
      <header><Header></Header></header>
      <main>
        <router-view></router-view>
      </main>
  </div>
</template>

<script>

import Header from './components/Main/Header';

export default {
  name: 'app',
  components:{
    Header
  },
  created(){
    this.$store.dispatch('init');
    this.$store.dispatch('albumsInit');
    this.$store.dispatch('photosInit');
  }
}
</script>

<style>
</style>