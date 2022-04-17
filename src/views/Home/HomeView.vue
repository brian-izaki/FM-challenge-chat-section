<template>
  <section class="chat-container">
    <template v-for="comment in getComments">
      <div :key="comment.id">
        <comment-card
          :comment="comment"
          @likeClick="likeComment"
          @unlikeClick="unlikeComment"
          @replyClick="showReply(comment.id, comment.user.username)"
        />

        <div class="replies-container">
          <reply-card
            v-model="reply.content"
            v-if="isCurrentReply(comment.id) && !!currentUser.username"
            :currentUser="currentUser"
            @send-click="sendReply(comment.id)"
          />
          <template v-for="replyData in comment.replies">
            <comment-card
              :key="`comment_${replyData.id}`"
              :comment="replyData"
              @likeClick="likeComment"
              @unlikeClick="unlikeComment"
              @replyClick="showReply(replyData.id, replyData.user.username)"
            />
            <reply-card
              :key="`reply_${replyData.id}`"
              v-model="reply.content"
              v-if="isCurrentReply(replyData.id) && !!currentUser.username"
              :currentUser="currentUser"
              @send-click="sendReply(replyData.id)"
            />
          </template>
        </div>
      </div>
    </template>

    <reply-card
      v-model="comment.content"
      v-if="!!currentUser.username"
      :currentUser="currentUser"
      @send-click="sendComment"
    />
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
      currentReply: null,
      reply: {
        content: "",
        replyTo: "",
      },
      comment: {
        content: "",
      },
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

    showReply(replyId, userReplying) {
      this.currentReply = replyId;
      this.reply.content = `@${userReplying}, `;
      this.reply.replyTo = userReplying;
    },

    sendReply(commentId) {
      console.log(commentId, this.reply, "teste");
    },

    sendComment() {
      console.log(this.comment);
    },

    isCurrentReply(toReplyId) {
      return this.currentReply === toReplyId;
    },

    cleanReplyText(content) {
      return content.replace(/@[\d\wç]+,/g, "").trim();
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
