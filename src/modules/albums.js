import Vue from "vue";
import * as mutationTypes from "./mutationTypes";

const state = {
  lastId:0,
  filterByUserId: "",
  albums: {}
};

const getters = {
  albumsOwner:(state, getters, rootState) => (userId) => {
      return rootState.users.users[userId];
  },
  filteredAlbums: state => {
      if (!state.filterByUserId) {
        return state.albums;
      } else {
        let validAlbums = Object.values(state.albums)
          .filter(album => (
            album.userId && album.userId == state.filterByUserId
          ));
        return {...validAlbums};
      }
  },
};

const mutations = {
  [mutationTypes.CHANGE_ALBUMS_FILTER] (state, filter) {
    state.filterByUserId = filter
  },
  [mutationTypes.INIT_ALBUMS] (state, albums) {
    state.lastId = Math.max(...Object.keys(albums));
    state.albums = {
      ...state.albums,
      ...albums
    };
  },
  [mutationTypes.ADD_ALBUM] (state, album) {
    state.lastId++;
    state.albums = {
      ...state.albums,
      [state.lastId]:{
        id: state.lastId,
        title: album.title,
        preview: album.preview,
        userId: album.userId
      }
    }
    
  },
  [mutationTypes.EDIT_ALBUM] (state, album) {
    state.albums = {
      ...state.albums,
     [album.id]:{
      ...state.albums[album.id],
      ...album.data
    }
    }
  },
  [mutationTypes.DELETE_ALBUM] (state, id) {
    Vue.delete(state.albums, id);
  }
};

const waitForAction = action => new Promise(res => {
  console.log(`Waiting for start of ${action} action!`);
  return setTimeout(res, 500)
});

async function getInitialAlbumsData(){
  let response = await fetch('https://jsonplaceholder.typicode.com/albums/');
  let albumData = await response.json();
  let albums = {};
  albumData.forEach(album => {
      albums[album.id]={
          id: album.id,
          title: album.title,
          userId: album.userId,
          preview: "https://placehold.it/150/" + album.id
      };
  })
  return albums;
}
const actions = {
  async albumsInit({commit}){
    commit(mutationTypes.INIT_ALBUMS, await getInitialAlbumsData());
  },

  async addAlbum({ commit }, data) {
    await waitForAction("ADD_ALBUM");
    commit(mutationTypes.ADD_ALBUM, data);
  },

  async changeAlbumsFilter({ commit }, data) {
    await waitForAction("CHANGE_ALBUMS_FILTER");
    commit(mutationTypes.CHANGE_ALBUMS_FILTER, data);
  },

  async editAlbum({ commit }, data) {
    await waitForAction("EDIT_ALBUM");
    commit(mutationTypes.EDIT_ALBUM, data);
  },

  async deleteAlbum({ commit }, id) {
    await waitForAction("DELETE_ALBUM");
    commit(mutationTypes.DELETE_ALBUM, id);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};