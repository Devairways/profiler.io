
const regHandler = (req,res,bcrypt,database)=>{
	const { email,name,password } = req.body;
	if (!name || !email || !password){
		return res.status(400).json("form not properly filled in");
	}
	const hash =bcrypt.hashSync(password);
	
	database.transaction(trx =>{
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail =>{
			return trx('users')
			.returning('*')
			.insert({
				name: name,
				email: loginEmail[0],
				joined: new Date()
			    })
			.then(user =>{
				setForeignkey(database,user[0])
				res.json(user[0])
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err=>{
		res.status(400).json('cannot register')
	})
}

const setForeignkey = (database,user)=>{
	database.transaction(trx =>{
		trx.insert({
			id: user.id
		})
		.into('links')
		.then(trx.commit)
		.catch(trx.rollback)

	})
}

module.exports ={
	regHandler
};