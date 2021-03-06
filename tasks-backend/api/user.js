const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{
    const obterHash = (password,callback) =>{
        bcrypt.genSalt(10,(err,salt) =>{
            bcrypt.hash(password,salt,null,(err,hash)=>callback(hash))
        })
    }
    const save = (req, resp) =>{
        obterHash(req.body.password, hash =>{
            const password = hash
            app.db('users')
                .insert({name:req.body.name, email:req.body.email, password})
                .then(_=> resp.status(204).send())
                .catch(err =>resp.status(500).json(err))
        })
    }

    return{save}
}