<template>
  <nav>
    <p class="main-title">Binary Studio Academy php16 homework</p>
    <ul class="menu">
      <li class="menu-item"><router-link to="/users">Users</router-link></li>
      <li class="menu-item"><router-link to="/albums">Albums</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  
}
</script>

<style>
  .menu .router-link-active{
    color:red;
    text-shadow: 2px 2px 2px rgb(0, 0, 0);
  }
  header{
    color:white;
    padding:5px 15px;
    background: #106e99;
  }
  nav{
    width:100%;
    display:flex;
    justify-content: space-between;
  }
  .menu{
    display: flex;
    justify-content: space-around;
  }
  .menu-item{
    margin:0 15px;
    list-style: none;
  }
  .menu-item a{
    color:white;
    text-decoration: none;
  }
</style>