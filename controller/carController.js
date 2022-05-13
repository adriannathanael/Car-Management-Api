const {car} = require('../models')

module.exports = class {

    static async createCar(req, res, next) {

        car.create({
            carmodel: req.body.carmodel,
            cartype: req.body.cartype,
            available: true,
            createdby: req.adminlogin.id,
            updatedby: req.adminlogin.id
        })

            .then((result) => {
                res.status(201).send({
                    status: 201,
                    message: 'car uploaded',
                    data: result
                })
            })
            .catch((err) => {
                res.status(400).send(err)
            })
    }

    static async getCarAvail(req, res, next) {

        car.findAll({
            where: {available: true}
        })

            .then ((result) => {
                res.status(200).send({
                    status: 200,
                    data: result
                })
            })
            .catch((err) => {
                res.status(400).send(err)
            })
    }

    static async updateCar(req, res, next) {
        try {
            const result = await car.update({...req.body,Updatedby: req.adminlogin.id},{where: {id: req.params.id}, returning: true})
                res.status(201).send({
                    status: 201,
                    message: 'data updated',
                    data: result.body
                })
            
        } catch (err) {
            res.status(500).send(err)
            
        }
    }

    static async deleteCar(req, res, next) {
        try{
            const delCar = car.update({deletedBy: req.adminlogin.id, available: false},{where: {id: req.params.id},returning: true})
                  res.status(201).send({
                    status: 201,
                    message: 'data deleted',
                    data: delCar.body
                })
        }
        catch(err){
            res.status(500).send(err)
        }
        }
}