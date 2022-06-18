import { v4 as uuidV4 } from "uuid";
import { getUserPosts, setUserPosts } from "./localStorage";

// FIXME refactor create, use one function to reply and comment
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

const removePost = (idComment, idReply) => {
  let idDeleted = null;
  const comments = getUserPosts().comments;
  const indexComment = getCommentIndex(comments, idComment);

  if (idReply) {
    const indexReply = getReplyIndex(comments, indexComment, idReply);

    comments[indexComment].replies.splice(indexReply, 1);
  } else {
    comments.splice(indexComment, 1);
  }

  setUserPosts({ comments });

  return idDeleted;
};

const updatePost = (idComment, idReply, content) => {
  const comments = getUserPosts().comments;
  const indexComment = getCommentIndex(comments, idComment);

  const post = {
    content: cleanReplyText(content),
    updateAt: new Date(),
  };

  if (idReply) {
    const indexReply = getReplyIndex(comments, indexComment, idReply);
    const reply = comments[indexComment].replies[indexReply];

    comments[indexComment].replies.splice(indexReply, 1, { ...reply, ...post });
  } else {
    const comment = comments[indexComment];
    comments.splice(indexComment, 1, { ...comment, ...post });
  }

  setUserPosts({ comments });
};

const getCommentIndex = (list, id) => {
  const index = list.findIndex((c) => c.id === id);

  if (index < 0) throw new Error(`Error: not found the comment id: ${id}`);
  return index;
};

const getReplyIndex = (list, commentIndex, id) => {
  const index = list[commentIndex].replies.findIndex((r) => r.id === id);

  if (index < 0) throw new Error(`Error: not found the reply id: ${id}`);
  return index;
};

const cleanReplyText = (content) => {
  if (!content) {
    return "";
  }
  return content.replace(/@[\d\wç]+,/g, "").trim();
};

export {
  createComment,
  createReply,
  removePost,
  updatePost,
  getCommentIndex,
  getReplyIndex,
};
