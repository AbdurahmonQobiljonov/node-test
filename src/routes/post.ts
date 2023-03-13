import express from 'express'
import type { Request, Response, Router } from 'express'
import { body, validationResult } from 'express-validator'
import {createNewPost, deletePost, getPost, listPosts, updatePost} from '../controllers/post'

export const postRouter: Router = express.Router()

// GEt:List of all post
postRouter.get('/', async(req:Request, res:Response)=>{
   try{
      const post = await listPosts()
      return res.status(200).json({                             
          status: 'success',
          length: post.length,
          data: post
      })
   } catch(err: any) {
    res.status(500).json(err.message)
   }
})

//Get a single post

postRouter.get('/:id', async(req:Request, res:Response) => {
  const id = +req.params.id 
  try{
    const post = await getPost(id)
    return res.status(200).json({                             
      status: 'success',
      data: post
    })
 } catch(err: any) {
  res.status(500).json(err.message)
 }
})

//Create post 
postRouter.post('/',body('content').isString(),body('title').isString(),body('authorId').isInt(), async(req:Request,res:Response) => {
  const err = validationResult(req)
  if(!err.isEmpty()) {
    res.status(500).json({
      errrors: err.array()
    })
  }
  try{
    const post = req.body
    const newPost = await createNewPost(post)
    res.status(200).json({
      status: 'success',
      data: newPost
    })
    
 } catch(err: any) {
   res.status(500).json(err.message)
 }
})


//Update post
postRouter.put('/:id',body('content').isString(),body('title').isString(),body('authorId').isInt(), async(req:Request,res:Response) => {
  const err = validationResult(req)
  const id = +req.params.id 
  if(!err.isEmpty()) {
    res.status(500).json({
      errrors: err.array()
    })
  }
  try{
    const post = req.body
    const updatedpost = await updatePost(post, id)
    res.status(200).json({
      status: 'success',
      data: updatedpost
    })
    
 } catch(err: any) {
   res.status(500).json(err.message)
 }
})


//delete post

postRouter.delete('/:id', async(req:Request, res:Response)=>{
  const id:number = +req.params.id
  try {
    await deletePost(id)
    return res.status(200).json('Your post has been deleted succesful!')
  } catch (err: any) {
    res.status(500).json(err.message)
  }
})

