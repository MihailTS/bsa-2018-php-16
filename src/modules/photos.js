import Vue from "vue";
import * as mutationTypes from "./mutationTypes";

const state = {
  lastId: 0,
  photos: {}
};

const getters = {
  photosByAlbum:(state, getters, rootState) => (albumId) => {
    let albumPhotos = [];
    for(let photoId in rootState.photos.photos){
      if(rootState.photos.photos[photoId].albumId == albumId){
        albumPhotos.push(rootState.photos.photos[photoId])
      }
    }
    return albumPhotos;
  }
}
const mutations = {
  [mutationTypes.INIT_PHOTOS] (state, photos) {
    state.lastId = Math.max(...Object.keys(photos));
    state.photos = {
      ...state.photos,
      ...photos
    };
  },
  [mutationTypes.ADD_PHOTO] (state, photo) {
    state.lastId++;
    state.photos = {
      ...state.photos,
      [state.lastId]:{
        id: state.lastId,
        title: photo.title,
        url: photo.url,
        albumId: photo.albumId
      }
    } 
  },
  [mutationTypes.DELETE_PHOTO] (state, id) {
    Vue.delete(state.photos, id);
  }
};

const waitForAction = action => new Promise(res => {
  console.log(`Waiting for start of ${action} action!`);
  return setTimeout(res, 500)
});

async function getInitialData(){

  let response = await fetch('https://jsonplaceholder.typicode.com/photos');
  let photosData = await response.json();
  let photos = {};
  photosData.forEach(photo => {
      photos[photo.id]={
          title: photo.title,
          url: photo.url,
          albumId: photo.albumId,
      };
  })
  return photos;
}
const actions = {
  async photosInit({commit}){
    commit(mutationTypes.INIT_PHOTOS, await getInitialData());
  },

  async addPhoto({ commit }, data) {
    await waitForAction("ADD_PHOTO");
    commit(mutationTypes.ADD_PHOTO, data);
  },

  async deletePhoto({ commit,rootState }, id) {
    await waitForAction("DELETE_PHOTO");
    commit(mutationTypes.DELETE_PHOTO, id);
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};