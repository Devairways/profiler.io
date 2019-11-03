

const userHandler = (req,res,database)=>{
	const { id } = req.params;
	console.log(id)
	if (id !== "all" && isNaN(id)){
		return database.select('*').from('users').leftJoin("links","users.link_id","links.id").where('users.name',id)
			.then(user =>{
					console.log("resp name",user)
					res.json(user[0])
				})
			.catch(err=> res.status(400).json('cant collect userinfo'))
	}else if (id !== "all") {
		    let search = id.toString()
            return database.select('*').from('users').leftJoin("links","users.link_id","links.id").where('users.id',id)
			.then(user =>{
					console.log("resp id",user)
					res.json(user[0])
				})
			.catch(err=> res.status(400).json('cant collect userinfo'))
	}

	else{
		return database.select('*').from('users')
			.then(users =>{
				res.json(users);
			})
			.catch(err=> res.status(400).json('cant collect userinfo'))
	}
}

const userUpdateHandler = (req,res,database)=>{
  const { id } = req.params;
  console.log("inkomend",req.body.formInput)
  const { name, age, about, location, link, gender } = req.body.formInput

	database.transaction(trx =>{
			trx.update({
				name,
				about,
				age,
				gender,
				country:location,
				link_id: id
			})
			.into('users').where("id",id)
			.then(loginEmail =>{
				setLinks(database,id,link)
				return trx('users')
				.returning('*').leftJoin("links","users.link_id","links.id")
				.where("users.id",id)
				.then(user =>{
					console.log("uitgaand",user)
					res.json(user[0])
				})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
}

const setLinks = (database,id,link)=>{
	database.transaction(trx =>{
		trx.update({
			link:link
		})
		.into('links').where("id",id)
		.then(trx.commit)
		.catch(trx.rollback)

	})
}

module.exports = {
	userHandler,
	userUpdateHandler

}