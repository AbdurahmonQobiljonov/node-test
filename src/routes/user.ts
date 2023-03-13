import express from 'express'
import type { Request, Response, Router } from 'express'
import { body, validationResult } from 'express-validator'
import {createUser, deleteUser, getUser, listUsers, updateUser, selectUserPosts} from '../controllers/user'

export const userRouter: Router = express.Router()

// GEt:List of all Users
userRouter.get('/', async(req:Request, res:Response)=>{
   try{
      const users = await listUsers()
      return res.status(200).json({                             
          status: 'success',
          length: users.length,
          data: users
      })
   } catch(err: any) {
    res.status(500).json(err.message)
   }
})

//Get a single user

userRouter.get('/:id', async(req:Request, res:Response) => {
  const id = +req.params.id 
  try{
    const user = await getUser(id)
    user!.posts = await selectUserPosts(id)
    return res.status(200).json({                             
      status: 'success',
      data: user
    })
 } catch(err: any) {
  res.status(500).json(err.message)
 }
})

//Create user 
userRouter.post('/',body('email').isEmail().isString(),body('password').isStrongPassword().isString(), async(req:Request,res:Response) => {
  const err = validationResult(req)
  if(!err.isEmpty()) {
    res.status(500).json({
      errrors: err.array()
    })
  }
  try{
    const user = req.body
    const newUser = await createUser(user)
    res.status(200).json({
      status: 'success',
      data: newUser
    })
    
 } catch(err: any) {
   res.status(500).json(err.message)
 }
})


//Update user
userRouter.put('/:id',body('email').isEmail().isString(),body('password').isStrongPassword().isString(), async(req:Request,res:Response) => {
  const err = validationResult(req)
  const id = +req.params.id 
  if(!err.isEmpty()) {
    res.status(500).json({
      errrors: err.array()
    })
  }
  try{
    const user = req.body
    const updatedUser = await updateUser(user, id)
    res.status(200).json({
      status: 'success',
      data: updatedUser
    })
    
 } catch(err: any) {
   res.status(500).json(err.message)
 }
})


//delete User

userRouter.delete('/:id', async(req:Request, res:Response)=>{
  const id:number = +req.params.id
  try {
    await deleteUser(id)
    return res.status(200).json('Your account has been deleted succesful!')
  } catch (err: any) {
    res.status(500).json(err.message)
  }
})

