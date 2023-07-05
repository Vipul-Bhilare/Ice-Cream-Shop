const mysql = require('mysql');

// Database configuration
const config = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'ice_cream_shop'
};

// Create a connection
const connection = mysql.createConnection(config);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database.');

  // Example of inserting data into the flavors table
  const name = 'Vanilla';
  const description = 'Classic and creamy';
  const image = 'vanilla.jpg';

  const insertQuery = 'INSERT INTO flavors (name, description, image) VALUES (?, ?, ?)';
  const insertValues = [name, description, image];

  connection.query(insertQuery, insertValues, (error, results) => {
    if (error) throw error;
    console.log('New flavor added successfully.');

    // Example of retrieving data from the flavors table
    const selectQuery = 'SELECT * FROM flavors';
    connection.query(selectQuery, (err, rows) => {
      if (err) throw err;
      console.log('Flavors:');
      rows.forEach((flavor) => {
        console.log('Flavor Name:', flavor.name);
        console.log('Description:', flavor.description);
        console.log('Image:', flavor.image);
        console.log();
      });

      // Close the connection
      connection.end((err) => {
        if (err) {
          console.error('Error closing the database connection: ', err);
          return;
        }
        console.log('Connection closed.');
      });
    });
  });
});
