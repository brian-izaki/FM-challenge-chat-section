<template>
  <section class="chat-container">
    <template v-for="comment in getComments">
      <div :key="comment.id">
        <comment-card
          v-model="toEdit.content"
          :isEdit="!toEdit.idReply && toEdit.idComment === comment.id"
          :comment="comment"
          :user="currentUser"
          @likeClick="likeComment"
          @unlikeClick="unlikeComment"
          @replyClick="showReply(comment.id, comment.user.username, comment.id)"
          @editClick="showEdit(comment.id, null)"
          @updateConfirm="updateComment"
          @removeClick="showRemoveModal(comment.id, null)"
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
              v-model="toEdit.content"
              :isEdit="toEdit.idReply === replyData.id"
              :key="`comment_${replyData.id}`"
              :comment="replyData"
              :user="currentUser"
              @likeClick="likeComment"
              @unlikeClick="unlikeComment"
              @replyClick="
                showReply(replyData.id, replyData.user.username, comment.id)
              "
              @updateConfirm="updateComment"
              @editClick="showEdit(comment.id, replyData.id)"
              @removeClick="showRemoveModal(comment.id, replyData.id)"
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

    <c-modal v-show="showModal">
      <template #header>
        <h1 class="title">Delete comment</h1>
      </template>
      <template #content>
        <p class="body">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone
        </p>
      </template>
      <template #footer>
        <button class="btn fill w-100 gray" @click="hideRemoveModal">
          NO, CANCEL
        </button>
        <button class="btn fill w-100 red" @click="deleteComment">
          YES, DELETE
        </button>
      </template>
    </c-modal>
  </section>
</template>

<script>
import CommentCard from "./components/CommentCard.vue";
import { createComment, createReply } from "@/services/posts.js";
import ReplyCard from "./components/ReplyCard.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import CModal from "./components/CModal.vue";

export default {
  name: "HomeView",
  components: { CommentCard, ReplyCard, CModal },

  mounted() {
    this.fetchComments();
  },

  data() {
    return {
      showModal: false,
      toEdit: { idComment: null, idReply: null, content: "" },
      toDelete: { idComment: null, idReply: null },
      currentReplyId: null,
      currentCommentId: null,
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
    ...mapActions("homePage", [
      "fetchComments",
      "updateComments",
      "deletePost",
      "updatePost",
    ]),
    ...mapMutations("homePage", ["SET_COMMENTS"]),

    likeComment(commentId) {
      console.log("liked", commentId, this.data);
    },

    unlikeComment(commentId) {
      console.log("unliked", commentId);
    },

    showReply(replyId, userReplying, commentId) {
      this.currentCommentId = commentId;
      this.currentReplyId = replyId;
      this.reply.content = `@${userReplying}, `;
      this.reply.replyTo = userReplying;
    },

    sendReply(commentId) {
      console.log(commentId, this.reply, "teste");
      const replyUpdated = createReply(
        {
          content: this.reply.content,
          replyingTo: this.reply.replyTo,
          replyingId: this.currentReplyId,
          currentUser: this.currentUser,
        },
        this.currentCommentId
      );

      this.SET_COMMENTS(replyUpdated);
      this.currentReplyId = null;
      this.updateComments();
    },

    sendComment() {
      console.log(this.comment);
      const commentUpdated = createComment({
        content: this.comment.content,
        currentUser: this.currentUser,
      });

      this.SET_COMMENTS(commentUpdated);
      this.currentCommentId = null;
      this.updateComments();
    },

    showEdit(idComment, idReply) {
      this.toEdit = { idComment, idReply, content: "" };
    },
    updateComment() {
      this.updatePost(this.toEdit);
      this.toEdit = { idComment: null, idReply: null, content: "" };
    },

    async deleteComment() {
      try {
        await this.deletePost(this.toDelete);
        this.showModal = false;
      } catch (e) {
        console.error(e);
      }
    },

    showRemoveModal(idComment, idReply) {
      this.toDelete = { idComment: null, idReply: null };
      this.toDelete = { idComment, idReply };
      this.showModal = true;
    },

    hideRemoveModal() {
      this.showModal = false;
    },

    isCurrentReply(toReplyId) {
      return this.currentReplyId === toReplyId;
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

.red {
  background: $red;
  font-weight: bold;
}

.gray {
  background: $gray;
  font-weight: bold;
}
</style>
