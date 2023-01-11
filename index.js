const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
let i = 1

let users = []

app.listen(port, () => {
    console.log(port)
})
app.get('/users', (req, res) => {
    res.send(users)
})

app.post('/users', (req, res) => {
    let newUser =
    {
        id : i,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password
    }
    ++i
    users.push(newUser)
    res.sendStatus(201)
})

app.get('/usersName/:prenom', (req, res) => {
    let userExist = false
    for(let user of users)
    {
        if(user.firstName === req.params.prenom)
        {
            res.send(user)
            userExist = true
        }
    }
    if(!userExist)
    {
        res.send('User inexistant')
    }
})

app.put('/changeUsers', (req, res) => {
    let userExist = false
    for(let user of users)
    {
        if(user.id == req.body.id)
        {
            console.log(user.id)
            switch (req.body.attributToChange) {
                case 'firstName': {
                    user.firstName = req.body.byThat
                    break
                }

                case 'lastName' : {
                    user.lastName = req.body.byThat
                    break
                }

                case 'password' : {
                    user.password = req.body.byThat
                    break
                }

                default : {

                }
            }
            userExist = true
        }
    }
    if(!userExist)
    {
        res.sendStatus(400)
    }
    else
    {
        res.sendStatus(201)
    }
})

app.put('/deleteUsers', (req, res) => {
    let userExist = false
    for(let i = 0; i < users.length; ++i)
    {
        if(users[i].id == req.body.id)
        {
            users.splice(i,1)
            userExist = true
        }
    }
    if(!userExist)
    {
        res.sendStatus(400)
    }
    else
    {
        res.sendStatus(201)
    }
})



