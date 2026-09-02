const app = require("./app");
const pool = require("./config/database");
const { connectRedis } = require('./config/redis');

const PORT = process.env.PORT || 8082;

const startServer = async () => {
  try {
    await pool.query("SELECT 1");

    console.log("MySQL connection successful");

    await connectRedis();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Product Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to MySQL:", error);
    process.exit(1);
  }
};

startServer();
