require("./.env")
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require("./controller/register");
const login = require("./controller/login");
const users = require("./controller/users");
const getUser = require("./controller/getUser");

const database = knex({
	client:APP_ENV,
	connection:{
		host:DB_HOST,
		user:'postgres',
		password:DB_PASS,
		database:'profiler'
	}
});

const whitelist = ['http://localhost:3001',"127.0.0.1"]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req,res)=>{
	res.send("we are in business")
})
app.post('/login',(req,res)=>{login.signinAuthentication(req,res,bcrypt,database)});
app.post("/register", (req,res) => {register.regHandler(req,res,bcrypt,database)});
app.get("/users/:id", (req,res) => {users.userHandler(req,res,database)});
app.post("/users/:id", (req,res) => {users.userUpdateHandler(req,res,database)});

app.listen(3003, ()=>{
	console.log("App running on port 3003");
})