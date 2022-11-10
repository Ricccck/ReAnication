module.exports = {
  leaveThread(userId, allUsers) {
    return allUsers.filter((user) => user.id != userId);
  },
};
