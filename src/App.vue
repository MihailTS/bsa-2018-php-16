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
  main{
    padding:10px 20px;
  }
  .btn{
    font-size:1em;
    cursor:pointer;
    display:inline-block;
    outline: none;
    border:1px solid black;
    text-decoration: none;
    background:#106e99;
    color:white;
    margin:0 15px;
    padding:5px 10px;
    border-radius:6px;
  }
  .btn.red-btn{
    background: #cb2d2d;
  }
  table{
    border-spacing: 0;
  }
  .striped tr:nth-child(2n){
    background: #e1e1e1;
  }
  label{
    display:block;
    margin:10px 0;
  }
  input[type="text"],input[type="email"],select{
    border-radius: 6px;
    outline: none;
    margin:0 5px;
    border:1px solid black;
    padding:5px;
  }
</style>