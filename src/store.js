import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users.js";
import albums from "./modules/albums.js";
import photos from "./modules/photos.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    users,
    albums,
    photos
  }
});