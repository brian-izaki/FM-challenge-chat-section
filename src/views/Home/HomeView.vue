<template>
  <section class="chat-container">
    <template v-for="comment in comments">
      <div :key="comment.id">
        <comment-card
          :comment="comment"
          @likeClick="likeComment"
          @unlikeClick="unlikeComment"
          @replyClick="replyComment"
        />
        <div class="replies-container">
          <comment-card
            v-for="reply in comment.replies"
            :key="reply.id"
            :comment="reply"
            @likeClick="likeComment"
            @unlikeClick="unlikeComment"
            @replyClick="replyComment"
          />
        </div>
      </div>
    </template>

    <div v-for="rep in reply" :key="rep.id">
      <component :is="'reply-card'" />
    </div>

    <reply-card />

    <!-- TODO: todo comentário tem a possibilidade de haver um reply (um array vazio) -->
    <!-- TODO: ao criar um reply apenas adiciono array de reply do comentário em questão -->
  </section>
</template>

<script>
import CommentCard from "./components/CommentCard.vue";
import ReplyCard from "./components/ReplyCard.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "HomeView",
  components: { CommentCard, ReplyCard },

  mounted() {
    this.fetchComments();
  },

  data() {
    return {
      reply: [],
    };
  },

  computed: {
    ...mapState("homePage", ["comments", "currentUser"]),
  },

  methods: {
    ...mapActions("homePage", ["fetchComments"]),

    likeComment(commentId) {
      console.log("liked", commentId, this.data);
    },

    unlikeComment(commentId) {
      console.log("unliked", commentId);
    },

    replyComment() {
      this.reply.push({ component: "reply-card", id: 1 });
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-container {
  margin: 20px 20% 0;
  background-color: $white;
  height: 100%;
}

.replies-container {
  box-sizing: border-box;
  border-left: 4px solid $gray_400;
  padding-left: 50px;
  margin-left: 50px;
}
</style>
