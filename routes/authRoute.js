// dont forget that you need to respond to a request so that app will not crash in general

// prisma
const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

// expressjs
const express = require('express')
const router = express.Router()

//jwt
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/', async (req, res) => {
  try {
    const decoded = jwt.verify(req.get('authorization'), process.env.SECRET_KEY)
    res.status(200).json({
      authenticated: true
    })
  } catch (err) {
    res.status(200).json({
      authenticated: false
    })
  }
})

module.exports = router
