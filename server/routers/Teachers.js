import { Router } from "express";
import bcrypt from 'bcrypt';
import client from "../databse.js";

const teacher = Router();

teacher.post('/signup', async(req, res)=>{
    const {
        name,
        id,
        password,
        title,
        department
    } = req.body;

    try {
        const con = await client.connect();
        let sqlCommand = `
            SELECT * 
            FROM teachers 
            WHERE id = '${id}';
        `;
        let dbResponse = await con.query(sqlCommand);
        // check if there is an account already
        if(dbResponse.rows.length > 0)
            return res.status(400).json({
                msg: "This id is already exists, try login"
            });
        
        const salt = await bcrypt.genSalt(parseInt(process.env.Salt));
        const hashedPass = await bcrypt.hash(password, salt); // encrypting the password

        sqlCommand = `
            INSERT INTO teachers(
                name,
                id,
                password,
                title,
                department
            ) VALUES(
                '${name}',
                '${id}',
                '${hashedPass}',
                '${title}',
                '${department}'
            );
        `;
        dbResponse = await con.query(sqlCommand);

        res.status(201).json({
            msg: 'Account is created successfuly'
        });
    } catch(err) {
        console.log(err);
        res.send(err);
    }
});

export default teacher;