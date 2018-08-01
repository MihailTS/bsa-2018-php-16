import Vue from 'vue'
import Router from 'vue-router'
import UserList from '@/components/Users/UserList'
import EditUser from '@/components/Users/EditUser'
import AddUser from '@/components/Users/AddUser'
import ShowUser from '@/components/Users/ShowUser'
import AlbumList from '@/components/Albums/AlbumList'
import AddAlbum from '@/components/Albums/AddAlbum'
import EditAlbum from '@/components/Albums/EditAlbum'
import ShowAlbum from '@/components/Albums/ShowAlbum'

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
      path: '/users/add',
      name: 'user-add',
      component: AddUser
    },
    {
      path: '/users/:id',
      name: 'user',
      component: ShowUser
    },
    {
      path: '/users/:id/edit',
      name: 'user-edit',
      component: EditUser
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
    },
    {
      path: '/albums/:id',
      name: 'album',
      component: ShowAlbum
    }
  ]
})
