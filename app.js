const express = require('express');
const cors = require('cors');
const application_routes = require('./apis');
const test_db_connection = require('./database/db_test_connection');
const { sequelize, db_generator } = require('./database/models/db_generator');

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Initialize and associate all models
const models = db_generator(sequelize);

// ✅ Test connection
test_db_connection()
  .then(() => console.log('DB connected successfully'))
  .catch((err) => {
    console.error('Initial DB connection failed:', err);
    process.exit(1);
  });

// ✅ Sync DB
sequelize.sync()
  .then(() => console.log('Database synced successfully'))
  .catch(err => {
    console.error('DB sync failed:', err);
    process.exit(1);
  });

// ✅ Routes
application_routes(app);

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send("Something went wrong!");
});

app.get('/', (req, res) => {
  res.send('Welcome to the Policy management system!');
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Process ID: ${process.pid}`);
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
