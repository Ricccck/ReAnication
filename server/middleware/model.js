const knex = require("../../db/knex");

module.exports = {
  async saveMessage(data) {
    const { username, message, thread, __createdtime__ } = data;

    const timestamp = JSON.stringify(__createdtime__);

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

  async getAllUsers() {
    return await knex
      .select({
        userName: "username",
        userEmail: "email",
        userPassword: "password",
      })
      .from("users");
  },

  getUserDataByEmail(userEmail) {
    return knex
      .select({
        userId: "id",
        userName: "username",
        firstName: "first_name",
        lastName: "last_name",
        gender: "gender",
        userEmail: "email",
      })
      .from("users")
      .where("email", "=", userEmail);
  },

  sendUserData(data) {
    const { userName, firstName, lastName, gender, userEmail, userPassword } =
      data;
    return knex("users").insert({
      username: userName,
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      email: userEmail,
      password: userPassword,
    });
  },
};
