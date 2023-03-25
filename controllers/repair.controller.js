
exports.allRepair=(req,res)=>{
    res.json({
        message:'todas las reparaciones'
    })
}

exports.createRepair=(req,res)=>{
    console.log(req.body),
    res.json({
        message:'crear reparacion'
    })
}

exports.repairById=(req,res)=>{
    res.json({
        message:'reparar por id'
    })
}

exports.repairUpDate=(req,res)=>{
    res.json({
        message:'actualizar reparacion'
    })
}

exports.repairDelete=(req,res)=>{
    res.json({
        message:'borrar reparacion'
    })
}

