

const userHandler = (req,res,database)=>{
	if (req.params.id !== "all"){
		console.log("soekterm",req.params.id)
		return database.select('*').from('users').innerJoin("links","users.link_id","links.id").where(function() {
  this.where('users.id', req.params.id).orWhere('users.name', req.params.id)})
			.then(user =>{console.log("soek",user)
				res.json(user[0]);
			})
			.catch(err=> res.status(400).json('cant collect userinfo'))
	}else{
		return database.select('*').from('users')
			.then(users =>{
				res.json(users);
			})
			.catch(err=> res.status(400).json('cant collect userinfo'))
	}
}

const userUpdateHandler = (req,res,database)=>{
  const { id } = req.params;
  const { name, age } = req.body.formInput
  database('users')
  .where({ id })
  .update({ name }) // nu kan je niet meer name gebruiken voor gegevensophalen inlogge!!!!1
  .then(resp => {
    if (resp) {
      res.json("success")
    } else {
      res.status(400).json('Not found')
    }
  })
  .catch(err => res.status(400).json('error updating user'))

}

module.exports = {
	userHandler,
	userUpdateHandler

}