import express from "express";
import cors from "cors";
import { PrismaClient } from ".prisma/client";

const app = express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();
const port = 5136;

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

app.listen(port, () => {
  console.log(`App is running: http://localhost:${port}`);
});
