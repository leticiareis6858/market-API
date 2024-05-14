import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Running...");
});

const port = process.env.PORT || 3000;

const start = async function () {
  try {
    app.listen(port, () => console.log(`Server is listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

export default app;

start();
