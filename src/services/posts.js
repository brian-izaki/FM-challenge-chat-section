import { v4 as uuidV4 } from "uuid";
import { getUserPosts } from "./localStorage";

const createComment = ({ content, currentUser }) => {
  try {
    const uuid = uuidV4();
    const comment = {
      id: uuid,
      content: cleanReplyText(content),
      createdAt: new Date(),
      score: 0,
      user: currentUser,
      replies: [],
    };

    const actualCommentsData = getUserPosts().comments;
    actualCommentsData.push(comment);
    return actualCommentsData;
  } catch (error) {
    console.error(error);
  }
};

const createReply = (
  { content, replyingTo, replyingId, currentUser },
  commentId
) => {
  try {
    const uuid = uuidV4();
    const reply = {
      id: uuid,
      content: cleanReplyText(content),
      createdAt: new Date(),
      score: 0,
      replyingTo: replyingTo,
      user: currentUser,
    };

    const actualCommentsData = getUserPosts().comments || [];
    const commentIndex = actualCommentsData.findIndex(
      (c) => c.id === commentId
    );

    if (commentIndex > -1) {
      const comment = actualCommentsData[commentIndex];
      const replyIndex = comment.replies.findIndex((r) => r.id === replyingId);
      comment.replies.splice(replyIndex + 1, 0, reply);
      console.log(`index`, replyIndex);
    }
    return actualCommentsData;
  } catch (error) {
    console.error("Erro ao criar uma resposta ao comentario", error);
  }
};

const cleanReplyText = (content) => {
  if (!content) {
    return "";
  }
  return content.replace(/@[\d\wç]+,/g, "").trim();
};

export { createComment, createReply };
