const knex = require("../../db/knex");

module.exports = {
  async saveMessage(data) {
    const { username, message, thread, __createdtime__ } = data;

    const timestamp = JSON.stringify(__createdtime__)

    return await knex("messages")
      .insert({
        username: username,
        message: message,
        thread: thread,
        timestamp: timestamp,
      })
      .catch((err) => {
        console.error(err);
      });
  },

  async getAllMessage(thread) {
    return await knex
      .select({
        username: "username",
        thread: "thread",
        message: "message",
        __createdtime__: "timestamp",
      })
      .from("messages")
      .where("thread", "=", thread);
  },
};
