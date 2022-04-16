<template>
  <section class="chat-container">
    <template v-for="comment in getComments">
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
        <div v-for="(rep, index) in repliesNow" :key="index">
          <!-- can be use reply-card component... but, for study purposes, used dynamic component -->
          <component :is="'reply-card'" v-bind="{ currentUser }" />
        </div>
      </div>
    </template>

    <reply-card v-if="!!currentUser.username" :currentUser="currentUser" />

    <!-- TODO: adicionar @nomeReply -->
    <!-- TODO: fazer lógica para incluir novos comentários (ao adicionar mostrar novo componente logo abaixo com um input de texto) -->
  </section>
</template>

<script>
import CommentCard from "./components/CommentCard.vue";
import ReplyCard from "./components/ReplyCard.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "HomeView",
  components: { CommentCard, ReplyCard },

  mounted() {
    this.fetchComments();
  },

  data() {
    return {
      repliesNow: [],
    };
  },

  computed: {
    ...mapState("homePage", ["currentUser"]),
    ...mapGetters("homePage", ["getComments"]),
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
