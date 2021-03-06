import { getUserPosts, setUserPosts } from "@/services/localStorage";
import {
  getCommentIndex,
  getReplyIndex,
  removePost,
  updatePost,
} from "@/services/posts";
import data from "../../../data.json";

let debounce = null;

const getInitialState = () => ({
  currentUser: {},
  comments: [],
  tempReplies: [],
});

export default {
  namespaced: true,

  state: getInitialState(),

  getters: {
    getComments(state) {
      return state.comments.map((c) => {
        return { ...c, tempReplies: [] };
      });
    },
  },

  mutations: {
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
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
      if (!getUserPosts().currentUser) {
        console.log(getUserPosts().currentUser);
        setUserPosts(data);
      }
      const userComments = getUserPosts();
      commit("SET_DATA", userComments);
    },

    async updateComments({ state }) {
      setUserPosts({ comments: state.comments });
    },

    deletePost({ dispatch }, { idComment, idReply }) {
      removePost(idComment, idReply);
      dispatch("fetchComments");
    },

    updatePost({ dispatch }, { idComment, idReply, content }) {
      updatePost(idComment, idReply, content);
      dispatch("fetchComments");
    },

    updateScorePost({ state, commit }, { idComment, idReply, isAdd = true }) {
      clearTimeout(debounce);
      const comments = state.comments;
      const commentINdex = getCommentIndex(comments, idComment);
      const score = isAdd ? 1 : -1;

      if (idReply) {
        const indexReply = getReplyIndex(comments, commentINdex, idReply);
        comments[commentINdex].replies[indexReply].score += score;
      } else {
        comments[commentINdex].score += score;
      }

      commit("SET_COMMENTS", comments);

      debounce = setTimeout(() => {
        console.log("timer", state.comments);
        setUserPosts({ comments: state.comments });
      }, 500);
    },
  },
};
