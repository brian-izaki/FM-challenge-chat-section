const posts = "userPosts";

const getUserPosts = () => {
  return JSON.parse(localStorage.getItem(posts) || "{}");
};

const setUserPosts = (val) => {
  const data = { ...getUserPosts(), ...val };
  localStorage.setItem(posts, JSON.stringify(data));
};

export { getUserPosts, setUserPosts };
