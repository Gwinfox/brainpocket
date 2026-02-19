const pool = require("../config/db");

module.exports = {
  getDialogs: async (req, res) => {
    try {
      const userId = parseInt(req.params["id"]);
      const [dialogs] = await pool.query(
        "SELECT * FROM dialogs JOIN users ON dialogs.sender2 = users.id WHERE dialogs.sender1 = ?",
        [userId]
      );
      res.send(
        dialogs.map((d) => ({
          id: d.dialog_id,
          sender1: d.sender1,
          sender2: d.sender2,
          senderData: {
            firstName: d.firstName,
            lastName: d.lastName,
            avatar: d.photos.avatar,
          },
          dialog: d.dialog,
        }))
      );
    } catch (error) {
      console.error("Ошибка при обработке запроса: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
};
