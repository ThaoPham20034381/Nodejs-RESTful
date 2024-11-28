const express = require('express')
const Sinhvien = require('../models/sinhvien')
const router = express.Router()

//All sinhvien route
router.get('/', async (req, res) => {
    let SearchOptions = {}
    if (req.query.name != null && req.query.name != '') {
        SearchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const sv = await Sinhvien.find(SearchOptions)
        res.render('sinhvien/index', { 
            sv: sv, 
            SearchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
    
})

//New sinhvien route
router.get('/new', (req,res) => {
    res.render('sinhvien/new', { sinhvien: new Sinhvien()})
})

//Create sinhvien route
router.post('/', async (req,res) => {
    const sinhvien = new Sinhvien({
        name: req.body.name,
        MSSV: req.body.MSSV,
        DateOfBirth: new Date(req.body.DateOfBirth),
        Class: req.body.Class
    })
    try {
        const newsinhvien = await sinhvien.save()
        res.redirect(`sinhvien/${newsinhvien.id}`)
    } catch {
        res.render('sinhvien/new', {
            sinhvien: sinhvien,
            errorMessage: 'Error creating sinhvien'
        })
    }
})

//Show one sinhvien
router.get('/:id', async (req,res) => {
    try {
        const sinhvien = await Sinhvien.findById(req.params.id)
        res.render('sinhvien/show', {
            sinhvien: sinhvien
        })
    } catch {
        res.redirect('/')
    }
})

//Edit sinhvien
router.get('/:id/edit', async (req,res) => {
    try {
        const sinhvien = await Sinhvien.findById(req.params.id)
        res.render('sinhvien/edit', { sinhvien: sinhvien})
    } catch {
        res.redirect('/sinhvien')
    }
    
})

//Update sinhvien
router.put('/:id', async (req,res) => {
    let sinhvien
    try {
        sinhvien = await Sinhvien.findById(req.params.id)
        sinhvien.name = req.body.name
        sinhvien.MSSV = req.body.MSSV
        sinhvien.DateOfBirth = req.body.DateOfBirth
        sinhvien.Class = req.body.Class
        await sinhvien.save()
        res.redirect(`/sinhvien/${sinhvien.id}`)
    } catch {
        if (sinhvien == NULL) {
            res.redirect('/')
        }
        else {
            res.render('sinhvien/edit', {
                sinhvien: sinhvien,
                errorMessage: 'Error updating sinhvien'
            })
        }  
    }
})

//Delete sinhvien
router.delete('/:id', async (req,res) => {
    let sinhvien
    try {
        sinhvien = await Sinhvien.findById(req.params.id)
        await sinhvien.deleteOne()
        res.redirect('/sinhvien')
    } catch (error) {
        if (sinhvien == null) {
            res.redirect('/')
        }
        else {
            res.redirect(`/sinhvien/${sinhvien.id}`)
        }  
    }
})

module.exports = router