import bcrypt from 'bcrypt-nodejs';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import knex from 'knex';
import handleImage from './controllers/image.js';
import handleProfile from './controllers/profile.js';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'colinblk',
        password: 'testdb',
        database: 'smartbrain'
    }
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('success')
})

app.post('/signin', (req, res) => { handleSignin(req, res, bcrypt, db) })
app.post('/register', (req, res) => { handleRegister(req, res, bcrypt, db) })
app.get('/profile/:id', (req, res) => { handleProfile(req, res, bcrypt, db) })
app.put('/image', (req, res) => { handleImage(req, res, bcrypt, db) })

app.listen(3000, () => {
    console.log('app is running')
})
