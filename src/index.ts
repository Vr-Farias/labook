import express, { Request, Response } from 'express';
import cors from 'cors';
import { TUserDB } from './types';
import { db } from './database/knex'
import { User } from './models/User';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

// ------------------------------------ TESTE PING
// app.get("/ping", async (req: Request, res: Response) => {
//     try {
//         res.status(200).send({ message: "Pong!" })
//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })

//  ----------------------------------------- get user

app.get("/users", async (req: Request, res: Response) => {
    try {
        const q = req.query.q

        let usersDB

        if (q) {
            const result: TUserDB[] = await db("users").where("name", "LIKE", `%${q}%`)
            usersDB = result
        } else {
            const result: TUserDB[] = await db("users")
            usersDB = result
        }

        const users: User[] = usersDB.map((userDB) => new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.created_at
        ))

        res.status(200).send(users)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
