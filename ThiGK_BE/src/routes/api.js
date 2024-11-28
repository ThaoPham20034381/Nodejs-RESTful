const express = require('express')
const ThiGK = require('../model/ThiGK')

const router = express.Router()

//Getting all
router.get('/users', async (req, res) => {
    try{
        const sv = await ThiGK.find()
        return res.status(200).json({
            message: 'All users',
            sv
        })
    } catch (error){
        res.status(500).json({ message: error.message}) //500:Báo lỗi trên server
    }
})  

//Creating one
router.post('/create-user', async (req, res) => {
    const sv = new ThiGK({
        name: req.body.name,
        mssv: req.body.mssv
    })
    try {
        const newsv = await sv.save()
        return res.status(200).json({
            message: 'Created user',
            newsv
        })
    }
    catch (err) {
        res.status(400).json({message: err.message}) //400:Lỗi nhập dữ liệu vào
    }
} )

//Updating one
router.put('/update-user/:id',getId,  async (req, res) => {
    if(req.body.name != null) {
        res.sv.name = req.body.name
    }
    if(req.body.mssv != null) {
        res.sv.mssv = req.body.mssv
    }
    try {
        const updatesv = await res.sv.save()
        return res.status(200).json({
            message: 'Updated user',
            updatesv
        })
    }
    catch (err) {
        res.status(400).json({message: err.message}) //400:Lỗi nhập dữ liệu vào 
    }

} )

//Deleting one
router.delete('/delete-user/:id',getId,async (req, res) => {
    try {
        await res.sv.deleteOne()
        return res.status(200).json({
            message: 'Deleted user'
        })
    }
    catch (err) {
        res.status(500).json({ message: error.message}) //500:Báo lỗi trên server
    }
})

//Geting one by mssv
router.get('/user/:mssv', async (req, res) =>{
    const mssv = req.params.mssv;
    try {
      const sv = await ThiGK.find({ mssv });
      if (sv) {
        res.json({ sv: sv });
      } else {
        res.status(404).json({ message: 'Không tìm thấy'});
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
})


async function getId(req,res,next) {
    let sv
    try {
        sv = await ThiGK.findById(req.params.id)
        if(sv == null)
            return res.status(404).json({message: 'Cannot find'})
    }
    catch (err){
        return res.status(500).json({message: err.message})
    }
    res.sv = sv
    next()
}

module.exports = router