import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware
blogRouter.use("*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = jwt.split(" ")[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload || typeof payload !== "object" || !payload.id) {
      throw new Error("Invalid token payload");
    }

    c.set("userId", payload?.id as string);
    await next(); // Ensure to await the next function
  } catch (err) {
    console.error("JWT verification error:", err);
    return c.json({ error: "Unauthorized" }, 401);
  }
});

// Routes
blogRouter.get("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: body.id,
      },
    });
    return c.json({
      blog,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog post",
    });
  }

  return c.text("Hello World");
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.get("/:id", async (c) => {
  const userId = c.get("userId");
  const blogId = c.req.param("id");
  return c.json({ message: `Fetching blog ${blogId} for user ${userId}` });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany();

  return c.json({
    blogs,
  })
});
