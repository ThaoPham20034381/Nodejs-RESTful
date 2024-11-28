const express = require('express')
const Student = require('../model/Students')
const StudentScoreRouter = express.Router()

// //All Student route
// StudentScoreRouter.get('/', async (req, res) => {
//     let SearchOptions = {}
//     if (req.query.mssv != null && req.query.mssv != '') {
//         SearchOptions.mssv = new RegExp(req.query.mssv, 'i')
//     }
//     try {
//         const sv = await Student.find(SearchOptions)
//         res.render('StudentScore/index', { 
//             sv: sv, 
//             SearchOptions: req.query
//         })
//     } catch {
//         res.redirect('/')
//     }
    
// })

// //New Student route
// StudentScoreRouter.get('/new', (req,res) => {
//     res.render('StudentScore/new', { sv: new Student()})
// })

// //Create Student route
// StudentScoreRouter.post('/', async (req,res) => {
//     const sv = new Student({
//         name: req.body.name,
//         mssv: req.body.mssv,
//         tk1: req.body.tk1,
//         tk2: req.body.tk2,
//         gk: req.body.gk,
//         ck: req.body.ck,
//     })
//     try {
//         const newsv = await sv.save()
//         res.redirect(`StudentScore/${newsv.id}`)
//     } catch {
//         res.render('StudentScore/new', {
//             sv: sv,
//             errorMessage: 'Error creating sinhvien'
//         })
//     }
// })

// //Show one Student
// StudentScoreRouter.get('/:id', async (req,res) => {
//     try {
//         const sv = await Student.findById(req.params.id)
//         res.render('StudentScore/show', {
//             sv: sv
//         })
//     } catch {
//         res.redirect('/')
//     }
// })

// //Edit Student
// StudentScoreRouter.get('/:id/edit', async (req,res) => {
//     try {
//         const sv = await Student.findById(req.params.id)
//         res.render('StudentScore/edit', { sinhvien: sinhvien})
//     } catch {
//         res.redirect('/StudentScore')
//     }
    
// })

// //Update Student
// StudentScoreRouter.put('/:id', async (req,res) => {
//     let sv
//     try {
//         sv = await Student.findById(req.params.id)
//         sv.name = req.body.name
//         sv.mssv = req.body.mssv
//         sv.tk1 = req.body.tk1
//         sv.tk2 = req.body.tk2
//         sv.gk = req.body.gk
//         sv.ck = req.body.ck
//         await sv.save()
//         res.redirect(`/StudentScore/${sinhvien.id}`)
//     } catch {
//         if (sv == NULL) {
//             res.redirect('/')
//         }
//         else {
//             res.render('StudentScore/edit', {
//                 sv: sv,
//                 errorMessage: 'Error updating sinhvien'
//             })
//         }  
//     }
// })

// //Delete StudentScore
// StudentScoreRouter.delete('/:id', async (req,res) => {
//     let sv
//     try {
//         sv = await Student.findById(req.params.id)
//         await sv.deleteOne()
//         res.redirect('/StudentScore')
//     } catch (error) {
//         if (sv == null) {
//             res.redirect('/')
//         }
//         else {
//             res.redirect(`/StudentScore/${sinhvien.id}`)
//         }  
//     }
// })

//Getting all
StudentScoreRouter.get('/', async (req,res) => {
    try{
        const sv = await Student.find()
        res.json(sv)
    } catch (error){
        res.status(500).json({ message: error.message}) //500:Báo lỗi trên server
    }
})
//Getting one
StudentScoreRouter.get('/:id',getId, async (req,res) => {
    res.json(res.sv)
})
//Creating one
StudentScoreRouter.post('/', async (req,res) => {
    const sv = new Student({
        name: req.body.name,
        mssv: req.body.mssv,
        tk1: req.body.tk1,
        tk2: req.body.tk2,
        gk: req.body.gk,
        ck: req.body.ck
    })
    try {
        const newsv = await sv.save()
        res.status(201).json(newsv) // 201: tạo thành công
    }
    catch (err) {
        res.status(400).json({message: err.message}) //400:Lỗi nhập dữ liệu vào
    }
})
//Updating one
StudentScoreRouter.patch('/:id',getId, async (req,res) => {
    if(req.body.name != null) {
        res.sv.name = req.body.name
    }
    if(req.body.mssv != null) {
        res.sv.mssv = req.body.mssv
    }
    if(req.body.tk1 != null) {
        res.sv.tk1 = req.body.tk1
    }
    if(req.body.tk2 != null) {
        res.sv.tk2 = req.body.tk2
    }
    if(req.body.gk != null) {
        res.sv.gk = req.body.gk
    }
    if(req.body.ck != null) {
        res.sv.ck = req.body.ck
    }
    try {
        const updatesv = await res.sv.save()
        res.json(updatesv)
    }
    catch (err) {
        res.status(400).json({message: err.message}) //400:Lỗi nhập dữ liệu vào 
    }

})
//Deleting one
StudentScoreRouter.delete('/:id', getId, async (req,res) => {
    try {
        await res.sv.deleteOne()
        res.json({message: 'Deleted Student'})
    }
    catch (err) {
        res.status(500).json({ message: error.message}) //500:Báo lỗi trên server
    }
})

//middleware lấy id
async function getId(req,res,next) {
    let sv
    try {
        sv = await Student.findById(req.params.id)
        if(sv == null)
            return res.status(404).json({message: 'Cannot find student'})
    }
    catch (err){
        return res.status(500).json({message: err.message})
    }
    res.sv = sv
    next()
}

module.exports = StudentScoreRouter