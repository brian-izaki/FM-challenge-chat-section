import data from "../../../data.json";

const getInitialState = () => ({
  currentUser: {},
  comments: [],
});

export default {
  namespaced: true,

  state: getInitialState(),

  getters: {},

  mutations: {
    SET_DATA(state, data) {
      state.currentUser = data.currentUser;
      state.comments = data.comments;
    },

    CLEAN_DATA(state) {
      const { comments, currentUser } = getInitialState();
      state.comments = comments;
      state.currentUser = currentUser;
    },
  },

  actions: {
    async fetchComments({ commit }) {
      const userComments = await new Promise((resolve) => resolve(data));
      commit("SET_DATA", userComments);
    },
  },
};
