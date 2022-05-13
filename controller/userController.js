const {user} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('../helper/jwt')

module.exports = class {
    static async registerMember (req, res, next) {
        try {
            const admin = await user.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                type:"member"
            })
            res.status(200).send({
                status: 200,
                message: 'Member added',
                data: admin 
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    }

    static async registerAdmin (req, res, next) {
        try {
            const admin = await user.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                type:"admin",
            })
            res.status(200).send({
                status: 200,
                message: 'admin added',
                data: admin 
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    }
    
    static async login (req, res, next) {
        try {
            const admin = await user.findOne({where: {email: req.body.email}})
            if (!admin) {
               res.status(404).send({
                status: 404,
                message: 'user not found!',
               }) 
            }

            const isValidPassword = await bcrypt.compare(req.body.password, admin.password)

            if (!isValidPassword) {
                res.status(404).send({
                    status: 400,
                    message: 'Email and password not match!',
                   }) 
            }
            const token = jwt.generateToken({email: admin.email, password: admin.password})
            const secureadmin = admin.dataValues
            delete secureadmin.password

            res.status(200).send({
                status: 200,
                message: 'Login Success',
                data: {
                    admin: secureadmin,
                    token: token
                }
               }) 
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    }

    static async getAllUser(req, res, next) {
        user.findAll({
            where: {...req.query}
        })
                .then((result) => {
                    res.status(200).send({
                        status: 200,
                        data: result,
                    })
                })
            .catch((err) => {
                res.status(400).send(err)
            })
    }
    
        static async currentUser (req, res, next) {
            try{
                res.status(200).send({
                    status: 200,
                    message: 'User not found',
                    data: req.adminlogin
                })
            } catch (error) {
                console.log(error);
                res.status(500).send(error)
            }
        }
        
}