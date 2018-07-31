import Vue from "vue";
import * as mutationTypes from "./mutationTypes";

const state = {
  filter: "",
  lastId: 0,
  users: {}
};

const getters = {
  filteredUsers: state => {
      if (!state.filter) {
        return state.users;
      } else {
        let validUsers = Object.values(state.users)
          .filter(user => (
            (user.name && user.name.toLowerCase().includes(state.filter.toLowerCase())) || 
            (user.email && user.email.toLowerCase().includes(state.filter.toLowerCase()))
          ));
        return {...validUsers};
      }
  }
};

const mutations = {
  [mutationTypes.CHANGE_FILTER] (state, filter) {
    state.filter = filter
  },
  [mutationTypes.INIT_USERS] (state, users) {
    state.lastId = Math.max(...Object.keys(users));
    state.users = {
      ...state.users,
      ...users
    };
  },
  [mutationTypes.ADD_USER] (state, user) {
    state.lastId++;
    state.users = {
      ...state.users,
      [state.lastId]:{
        id: state.lastId,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    } 
  },
  [mutationTypes.EDIT_USER] (state, user) {
    state.users = {
      ...state.users,
     [user.id]:{
      ...state.users[user.id],
      ...user.data
    }
    }
  },
  [mutationTypes.DELETE_USER] (state, id) {
    Vue.delete(state.users, id);
  }
};

const waitForAction = action => new Promise(res => {
  console.log(`Waiting for start of ${action} action!`);
  return setTimeout(res, 500)
});

async function getInitialData(){
  let response = await fetch('https://jsonplaceholder.typicode.com/users/');
  let usersData = await response.json();
  let users = {};
  usersData.forEach(user => {
      users[user.id]={
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: "https://placehold.it/50/" + user.id
      };
  })
  return users;
}
const actions = {
  async init({commit}){
    commit(mutationTypes.INIT_USERS, await getInitialData());
  },

  async addUser({ commit }, data) {
    await waitForAction("ADD_USER");
    commit(mutationTypes.ADD_USER, data);
  },

  async changeFilter({ commit }, data) {
    await waitForAction("CHANGE_FILTER");
    commit(mutationTypes.CHANGE_FILTER, data);
  },

  async editUser({ commit }, data) {
    await waitForAction("EDIT_USER");
    commit(mutationTypes.EDIT_USER, data);
  },

  async deleteUser({ commit }, id) {
    await waitForAction("DELETE_USER");
    commit(mutationTypes.DELETE_USER, id);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};