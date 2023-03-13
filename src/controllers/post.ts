import { db } from '../utils/db.server'
import {Post, createPost} from '../interfaces/user'
import {currentPage, pageSize} from '../utils/constants/pagination'

export const listPosts = async(): Promise<Post[]> => {
  return db.post.findMany({
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
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


export const getPost = async(id: number):Promise<Post|null> => {
   return db.post.findUnique({
    where: {
      id,
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

export const createNewPost = async(post: createPost):Promise<Post> => {
  const {title, content, authorId } = post
  return db.post.create({
    data: {
      title,
      content,
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

export const updatePost = async(post: Omit<createPost,'id'>, id: number):Promise<Post> => {
  const {content, authorId, title} = post
  return db.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
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

export const deletePost = async(id: number): Promise<void> => {
  db.post.delete({
    where: {
      id
    }
  })
}