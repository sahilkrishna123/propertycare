import mysql from "mysql2";
import fs from "fs";

// Create a connection to the remote database

// Read the SQL file
const sqlFile = fs.readFileSync("./stateagency.sql", "utf8");

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the remote MySQL database.");

  // Example query
  //   connection.query('SELECT * FROM your_table', (err, results) => {
  connection.query("show tables", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    console.log("Query results:", results);

    // Close the connection
    connection.end();
  });

  //    // Run the SQL file
  //    connection.query(sqlFile, (err, results) => {
  //     if (err) {
  //       console.error('Error running SQL script:', err);
  //       return;
  //     }

  //     console.log('SQL script executed successfully:', results);
  //     connection.end(); // Close the connection when done
  //   });
});
