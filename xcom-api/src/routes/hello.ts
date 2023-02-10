import express, { Request, Response } from "express";
const router = express.Router();
// const port = 4000;

router.get("/api/hello", (req: Request, res: Response) => {
  res.send("Hello World!10000");
  console.log("hello world  2525");
});

export { router as helloRouter };
