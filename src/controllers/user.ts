import { db } from '../utils/db.server'
import {User, Post} from '../interfaces/user'
import {currentPage, pageSize} from '../utils/constants/pagination'


export const listUsers = async(): Promise<User[]> => {
  return db.user.findMany({
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    select: {
      id: true,
      email: true,
      password: true,
    }
  })
}


export const getUser = async(id: number):Promise<User|null> => {
   return db.user.findUnique({
    where: {
      id,
    }
   })
}

export const createUser = async(user: Omit<User, 'id'>):Promise<User> => {
  const {email, password} = user
  return db.user.create({
    data: {
      email: user.email,
      password: user.password
    },
    select: {
      id: true,
      email:true,
      password: true,
    }
  })
}

export const updateUser = async(user: Omit<User,'id'>, id: number):Promise<User> => {
  const {email, password} = user
  return db.user.update({
    where: {
      id,
    },
    data: {
      email,
      password
    },
    select: {
      id: true,
      email: true,
      password: true
    }
  })
}

export const deleteUser = async(id: number): Promise<void> => {
  db.user.delete({
    where: {
      id
    }
  })
}

export const selectUserPosts = async(authorId: number): Promise<Post[]> => {
  return db.post.findMany({
    where: {
      authorId
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          id: true,
          email: true,
          password: true
        }
      },
    }
  })
}