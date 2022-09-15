import express from "express";
import cors from "cors";
import { PrismaClient } from ".prisma/client";

const app = express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();
const port = 5136;



// get All users 

app.get('/users', async (req,res)=>{
    try{
        const users = await prisma.user.findMany({include:{blogs:true}})
       res.send(users)
    } catch (error){
        // @ts-ignore
        res.status(400).send({error:error.message})
    }
})
//  Get All Blogs
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: { user: true, likes: true, responds: true },
    });
    res.send(blogs);
  } catch (error) {
    // @ts-ignore
    res.status(400).send({ error: error.message });
  }
});
//  Get a Specific  Post
app.get("/blogs/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { user: true, likes: true, responds: true },
    });
    if (blog) {
      res.send(blog);
    } else {
      res.status(404).send({ error: "Blog not Found!" });
    }
  } catch (error) {
    //  @ts-node
    res.status(400).send({ error: "blog not Found!" });
  }
});
//  Create  a Post
app.post("/blogs", async (req, res) => {
  try {
    const blog = await prisma.blog.create({ data: req.body });
    res.send(blog);
  } catch (error) {
    // @ts-ignore
    res.status(400).send({ error: error.message });
  }
});


//  delete a Blog

app.delete("/blogs/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const blog = await prisma.blog.delete({
      where: { id },
    });
    res.send(blog);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});


// app.patch('/addCommentToBlog', async (req, res) => {
//     const blogId = Number(req.body.blogId)
//     // const commentId = Number(req.body.commentId)
//     const comment = req.body.comment
  
//     const blog = await prisma.blog.update({
//       where: { id:blogId },
//       data: {
//         responds: {
//             // @ts-ignore
//           create:{
//             comment :  comment 
//           }
//         },user:{connect:{id: userId}}
//       },
//       include: {
//         responds: true
//       }
//     })
  
//     res.send(blog)
//   })
app.get('/responds', async (req,res)=>{
    try{
        const comment = await prisma.responds.findMany({include:{blog:true, user:true}})
    res.send(comment)
    } catch (error){
        // @ts-ignore
        res.status(404).send({error:error.message})
    }
})
// create new Comment 
app.post('/responds', async (req,res)=>{
    try{
        const comment = await prisma.responds.create({data:req.body})
    res.send(comment)
    } catch (error){
        // @ts-ignore
        res.status(404).send({error:error.message})
    }
})

// app.post('/responds', async (req,res)=>{
//     const commentData = {
//         comment :req.body.comment,
//         user:req.body.userId,
//         blog:
//     }
// })

// app.post ('/likes', async (req,res)=>{
//     const likes = {
//         blogId : req.body.blogId
//     }
//     try{
//         const likeABlog = await prisma.likes.create({
//             data:{
//                 blogId:likes.blogId
//             },
//             include:{blog:true}
//         })
//         res.send(likeABlog)
//     }
// })

app.listen(port, () => {
  console.log(`App is running: http://localhost:${port}`);
});
