const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MySQL Connection Configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'csbm_system'
});

// Endpoint to fetch menu items
app.get('/menu', async (req, res) => {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    // SQL query to select all menu items
    const [rows, fields] = await connection.execute('SELECT * FROM menu');
    // Release the connection back to the pool
    connection.release();
    // If query successful, send back the menu items
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving menu items: ' + error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
