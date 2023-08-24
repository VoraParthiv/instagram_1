const tokens = [];
const postIds = [];

exports.saveUsersToken = (userId, token, userName) => {
  tokens.push({ id: userId, token, name: userName });
};
exports.getToken = (name) => {
  const a = tokens.find((items) => items.name === name);
  return a;
};
exports.savePostIds = (postId) => {
  postIds.push({ postId });
};
exports.getSavePostIds = () => postIds;

exports.url = 'http://localhost:5000';
