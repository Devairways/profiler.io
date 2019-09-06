

const userHandler = (req,res,database)=>{
	const user = req.params.name;
	
		return database.select('*').from('users').innerJoin("login","users.email","login.email").where('users.name',"=",user)
			.then(user =>{
				res.json(user);
			})
			.catch(err=> res.status(400).json('cant collect userinfo'))
	}

module.exports = {
	userHandler

}