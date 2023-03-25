const User=require('./../models/users.model')

exports.findAll = async (req, res) => {
    const users= await User.findAll({
        where:{
            status:'available'
        }
    });

    res.status(200).json({
        message:'The query has been donde success',
        results: users.length,
        users
    })  
}

exports.userById =async (req, res) =>  {
    const {id}=req.params

}

exports.createUser = async (req, res) => {
    const {
        name,
        email,
        password,
        role
    }=req.body;

    const user= await User.create({
            name,
            email,
            password,
            role
        })

        res.satus(201).json({
            status:'succes',
            massage:'The user has been created',
            user
        })
    }

exports.upDateUser = (req, res) => {
    res.json({
        message: "Actualizando usuario"
    })
}

exports.deleteUser = (req, res) => {
    res.json({
        message: "Eliminando usuario"
})
}