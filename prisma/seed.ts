import {db} from '../src/utils/db.server'

interface User {
  id: number;
  email: string;
  password: number;
  posts: Post[];
}
  
interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  published: boolean;
}

interface Feedback {
  raterate :number    
  descpiption: string
}


const getUsers = ():User[]=> {
  return [
    {
      id: 1,
      email: "test@gmail.com",
      password:12345,
      posts: [{
        id: 1,
        title: 'education',
        content: 'hello world',
        author: {
          id: 2,
          email: "tests@gmail.com",
          password:12345,
          posts: []
        },
        published: false
      }]
    },
    {
      id: 2,
      email: "tests@gmail.com",
      password:12345,
      posts: [{
        id: 1,
        title: 'education',
        content: 'hello world',
        author: {
          id: 2,
          email: "tests@gmail.com",
          password:12345,
          posts: []
        },
        published: false
      }]
    }
  ]
}

const getPosts = ():Post[] => {
  return [
    {
      id: 1,
      title: 'education',
      content: 'hello world',
      author: {
        id: 2,
        email: "tests@gmail.com",
        password:12345,
        posts: []
      },
      published: false
    }
  ]
} 

const seed = async() => {
  await Promise.all(getUsers().map((user)=>{
    return db.user.create({
      data: {
        email: user.email,
        password: user.password,
      }
    })
  }))

  const user = await db.user.findFirst({
    where: {
      email: 'test@gmail.com'
    }
  })

  await Promise.all(
    getPosts().map((post) => {
      const { title, content, published } = post;
      return db.post.create({
        data: {
          title,
          content,
          published,
          authorId: user!.id
        }
      })
    })
  )

  seed()
}