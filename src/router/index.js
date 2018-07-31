import Vue from 'vue'
import Router from 'vue-router'
import UserList from '@/components/Users/UserList'
import EditUser from '@/components/Users/EditUser'
import AddUser from '@/components/Users/AddUser'
import AlbumList from '@/components/Albums/AlbumList'
import AddAlbum from '@/components/Albums/AddAlbum'
import EditAlbum from '@/components/Albums/EditAlbum'

Vue.use(Router)

export default new Router({
  base: "/",
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: 'users'
    },
    {
      path: '/users',
      name: 'users',
      component: UserList
    },
    {
      path: '/users/:id/edit',
      name: 'user-edit',
      component: EditUser
    },
    {
      path: '/users/add',
      name: 'user-add',
      component: AddUser
    },
    {
      path: '/albums',
      name: 'albums',
      component: AlbumList
    },
    {
      path: '/albums/:id/edit',
      name: 'album-edit',
      component: EditAlbum
    },
    {
      path: '/albums/add',
      name: 'album-add',
      component: AddAlbum
    }
  ]
})
