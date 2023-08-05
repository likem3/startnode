import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dbDriver from "../lib/prisma";
import * as dontev from "dotenv";
dontev.config();

const app: Application = express();

app.use(cors({ origin: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req: Request, res:Response) => {
    res.send({"status": true, "msg": "Hello world!"});
});

app.post("/users", async (req:Request, res:Response) => {
    const { email, firstname, lastname } = req.body;
    const newUser = await dbDriver.user.create({
        data: { email, firstname, lastname },
    });
    res.status(201).json(newUser);
});

app.get("/users/:id", async (req:Request, res:Response) => {
    const { id } = req.params;
    const user = await dbDriver.user.findUnique({
        where: { id: parseInt(id) }
    });
    res.json(user);
});

// app.put("/users/:id", async (req:Request, res:Response) => {
//     const { id } = req.params;
//     const { email, firstName, lastName } = req.body;
//     const updateUser = await prisma.user.update({
//         where: { id: parseInt(id) },
//         data: { email: email, firstname: firstName, lastname: lastName },
//     });
//     res.status(200).json(updateUser);
// });

// app.delete("/users/:id", async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const deleteUser = await prisma.user.delete({
//         where: { id: parseInt(id) }
//     });
//     res.status(204).json(deleteUser);
// });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

console.log(process.env.SECRET_CODE);