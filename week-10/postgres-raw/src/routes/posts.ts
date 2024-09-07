import express,{Request,Response} from "express";
import { createPost, getPosts, getSinglePost } from "../controllers/posts";

const router = express.Router();


router.post('/',createPost);
router.get('/',getPosts)
router.get('/:id',getSinglePost)

export default  router;