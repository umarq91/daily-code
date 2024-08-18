import { Client } from "pg"
import dotenv from "dotenv";
dotenv.config();
// let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// console.log({ PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID });
const client = new Client({
  connectionString:"postgresql://learn_owner:w3LZphdiX0Om@ep-falling-fire-a5df10pe.us-east-2.aws.neon.tech/learn?sslmode=require"
})

// CREATE TABLE
// async function createTable() {
//   try {
//     await client.connect(); // Ensure client connection is established
//     const query = 'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255))';
//     await client.query(query);
//     console.log('Table created successfully.');
//   } catch (err) {
//     console.error('Error during table creation:', err);
//     throw err; // Rethrow or handle error appropriately
//   } finally {
//     await client.end(); // Close the client connection
//   }
// }

 // Function to insert user data into the database
// async function insertUser(username: string, email: string, password: string) {
//   try {
//     await client.connect(); // Ensure client connection is established
//     const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
//     const values = [username, email, password];
//     await client.query(query, values);
//     console.log('User data inserted successfully.');
//   } catch (err) {
//     console.error('Error during insertion:', err);
//     throw err; // Rethrow or handle error appropriately
//   } finally {
//     await client.end(); // Close the client connection
//   }
// }

// Async function to fetch user data from the database given an email
async function getUser(email: string) {

  
  try {
  client.connect()
  .then(()=>console.log('db connected')).catch(()=>console.log('err in connecting'))
   // Ensure client connection is established
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await client.query(query, values);
    
    if (result.rows.length > 0) {
      console.log('User found:', result.rows[0]); // Output user data
      return result.rows[0]; // Return the user data
    } else {
      console.log('No user found with the given email.');
      return null; // Return null if no user was found
    }
  } catch (err) {
    console.error('Error during fetching user:', err);
    throw err; // Rethrow or handle error appropriately
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
getUser('user3@example.com').catch(console.error);