const express = require('express');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'docker',
    database: 'inventory'
  }
});

const app = express();
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use(cookieSession({
  name: 'user_session',
  httpOnly: true,
  sameSite: 'strict',
  secret: 'testingsessioncapabilities'
}))

//HELPERS
const passHasher = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

const hashCompare = (inputPassword, storedHash) => {
  let doesMatch = bcrypt.compareSync(inputPassword, storedHash)
  return doesMatch
}

const retrievePass = async (username) => {
  let hash
  try {
    hash = await knex('users')
    .select('password').where('username', '=', `${username}`)
    .then(array => array[0].password)
    .catch(err => {
      console.log(err)
      console.log('There was a problem retrieving the password.')
    })
  }
  catch(err) {
    console.log(err)
  }
  return hash
}

const getUserID = (username) => {
  let userID = knex('users')
  .select('id')
  .where('username', '=', `${username}`)
  .then(rows => rows[0].id)
  return userID
}

// app.get('/', async (req,res) => {
//   let userID = await getUserID('Test')
//   console.log(userID)
// })

//BEGIN REQUESTS
app.get('/inventory', async (req, res) => {
  let items
  try {
    items = await knex('items')
      .select('*')
      .then(rows => rows)
    res.status(200).send(items);
  }catch(err) {
    console.log(err);
    res.send('There was an error processing your request.')
  }
})

app.post('/inventory', async (req, res) => {
  const { body } = req;
  const quantity = parseInt(body.quantity)
  let userID = await getUserID(body.username)
  console.log(typeof userID);
  try {
    let newItem = await knex('items')
      .insert({user_id:`${userID}`, item_name: `${body.itemname}`, description: `${body.description}`, quantity: `${quantity}`}, 'id')
      .then(id => {
        console.log(id)
        res.status(201).send('Item creation successful.')
      })
  }
  catch(err){
    console.log(err)
  }
})

app.get('/inventory/:username', async (req, res) => {
  const username = req.session.username;
  if(username === req.params.username){
    try{
      let items
      let userID = await getUserID(username)
        items = await knex('items')
          .select('*').where('user_id', '=', `${userID}`)
          .then(rows => rows)
        res.status(200).send(items);
      }catch(err) {
        console.log(err);
        res.send('There was an error processing your request.')
      }
  }else{
    res.status(404).json('You do not have permission to view this page.')
  }
})

app.post('/CreateAccount', async (req, res) => {
  const { body } = req;
  const hashedPass = await passHasher(body.password)
  try {
    let newUser = await knex('users')
      .insert({first_name: `${body.firstName}`, last_name: `${body.lastName}`, username: `${body.username}`, password: `${hashedPass}`}, 'id')
      .then(id => {
        console.log(id)
        res.status(201).send('User creation successful.')
      })
  }
  catch(err){
    console.log(err)
  }
})

app.post('/Login', async (req, res) => {
  const { body } = req;
  try {
    let storedPass = await retrievePass(body.username);
    let doesMatch = await hashCompare(body.password, storedPass)
    if(doesMatch){
      req.session.username = req.body.username;
      console.log(req.session.username)
      res.status(202).send('Authenticated')
    }else{
      res.status(404).json('Password does not match.')
    }
  }
  catch(err){
    console.log(err);
    res.send('An error occurred.')
  }
})



// app.delete('/', async (req, res) => {
//   const { body } = req;
//   try {
//     let deleteMovie = await knex('movies')
//       .delete('*').where('id', '=', `${body.id}`)
//     res.status(202).json('Item successfully deleted.')
//   }
//   catch(err){
//     console.log(err)
//     res.status(400).json('There was a problem processing your request.')
//   }
// })

// app.put('/', async (req, res) => {
//   const { body } = req;
//   try {
//     let setWatched = await knex('movies')
//       .where('id', '=', `${body.id}`)
//       .update({
//         watched: `${body.watched}`
//       })
//     res.status(200).json('Watched toggled.')
//   }
//   catch(err){
//     console.log(body);
//     res.status(400).json('There was an error processing your request.')
//   }
// })

module.exports = app