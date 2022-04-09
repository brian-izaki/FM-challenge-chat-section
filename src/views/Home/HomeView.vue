<template>
  <section class="chat-container">
    <comment-card
      :comment="{}"
      @likeClick="likeComment"
      @unlikeClick="unlikeComment"
    />

    <reply-card />
  </section>
</template>

<script>
import CommentCard from "./components/CommentCard.vue";
import ReplyCard from "./components/ReplyCard.vue";

export default {
  name: "HomeView",
  components: { CommentCard, ReplyCard },

  data() {
    return {};
  },

  methods: {
    likeComment(commentId) {
      console.log("liked", commentId);
    },

    unlikeComment(commentId) {
      console.log("unliked", commentId);
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-container {
  margin-top: 20px;
  background-color: $white;
  height: 100%;
}
</style>
