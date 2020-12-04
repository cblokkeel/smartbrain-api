import bcrypt from 'bcrypt-nodejs';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express()
app.use(bodyParser.json())
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.json(database.users)
})

app.post('/signin', (req, res) => {
    bcrypt.compare("qsd", '$2a$10$PHEbKtVM7OoUyVT5HR3d.u.l9tNAbQfsrC4CARxK3aJ3B1XNbMMVC', function(err, res) {
        console.log('first guess', res)
    })
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0])
    } else {
        res.status(400).json('error logging in')
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash)
    })
    database.users.push({
        id: (Number(database.users[database.users.length-1].id)+1).toString(),
        name,
        email,
        password,
        entries: 0,
        joined: new Date()
    })
    res.json(database)
})

const checkUserId = (id, incrementEntries, req, res) => {
    let isThere = false
    database.users.forEach(user => {
        if (user.id === id) {
            isThere = true
            incrementEntries ? user.entries++ : null 
            return res.json(user)
        }
    })
    return !isThere ? res.status(400).json('no such user') : null 
}

app.get('/profile/:id', (req, res) => {
    const { id } = req.params
    checkUserId(id, false, req, res)
})

app.put('/image', (req, res) => {
    const { id } = req.body
    checkUserId(id, true, req, res)
})

app.listen(2002, () => {
    console.log('app is running')
})

/*

/ -> res = this is working
/signin -> POST = success/fail
/register -> POST = user
/profile/:userId -> GET = user
/image -> PUT = user 

*/