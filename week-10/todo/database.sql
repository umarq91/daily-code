CREATE DATABASE pernTodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255)
)