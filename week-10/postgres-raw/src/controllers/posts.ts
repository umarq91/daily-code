import {Request,Response} from "express";
import {client} from "../db";

export const createPost = async (req: Request, res: Response) => {
const {title,content,author_id} =req.body;
try {
  let result= await client.query(`INSERT INTO posts (title, content, author_id) 
    VALUES ($1, $2, $3) RETURNING *`, [title, content, author_id]);
res.json(result.rows[0]);
} catch (error:any) {
      console.error('Error creating post', error);
      res.status(500).json({ error: 'Failed to create post' });
}
}

export const getPosts = async (req: Request, res: Response) => {
  try {
    console.log(req.ip);

    let result = await client.query("SELECT * FROM posts");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to load post" });
  }
};

export const getSinglePost = async(req:Request,res:Response)=>{
  try {
    
    const { id } = req.params;
    const result = await client.query(
      `SELECT posts.*, users.username, users.email 
      FROM posts 
      JOIN users ON posts.author_id = users.id 
      WHERE posts.id = $1`, 
      [id]
    );

       if (result.rows.length === 0) {
        return res.status(404).json({ message: "Post not found" });
      }
    res.json(result.rows[0]);
  } catch (error) {
    
  }
}