import {Client} from "pg"

const client = new Client({
    // user: "postgres",
    // host: "localhost",
    // database: "todos",
    // password: "password",
    // port: 5432
    connectionString: process.env.DB_STRING
})

client.connect()
.then(()=>console.log('db connected'))
.catch(()=>console.log('err in connecting'))   


export default client;