const express = require('express')
const { PrismaClient, Prisma } = require('@prisma/client')
const jwt = require('jsonwebtoken')

const router = express.Router()
const prisma = new PrismaClient()
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

// create account
router.post('/create-account', async (req, res) => {
  await prisma.user
    .create({ data: req.body })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Successfully created an account!'
      })
    })
    .catch((err) => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          console.log('There is a unique constraint violation, a new user cannot be created with this email')
        }
      }
      res.status(500).json({
        message: 'Internal Server Error'
      })
    })
})

//log account
router.post('/login-account', async (req, res) => {
  await prisma.user
    .findUnique({
      where: {
        email: req.body.email
      },
      select: { email: true, id: true, password: true }
    })
    .then(async (user) => {
      // if user exists
      if (user !== null) {
        if (req.body.password === user.password) {
          const token = jwt.sign(req.body, process.env.SECRET_KEY, { expiresIn: '7d' })
          res.status(200).json({
            message: 'successfully logged in!',
            userId: user.id,
            token: token
          })
        } else {
          res.status(401).json({
            message: 'Wrong password!'
          })
        }
      } else {
        res.status(400).json({
          message: 'Account not existing!'
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Internal Server Error')
    })
})

//get user details
router.get('/get-user/:id', async (req, res) => {
  await prisma.user
    .findUnique({
      where: {
        id: req.params.id
      }
    })
    .then(async (user) => {
      res.status(200).json(user)
    })
    .catch((err) => res.status(500).send('Internal Server Error'))
})

//update user account
router.put('/update-account/:id', async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: req.body
  })

  res.status(200).send('updating user')
})

//delete user account
router.delete('/delete-account/:id', async (req, res) => {
  await prisma.user
    .delete({
      where: {
        id: req.params.id
      }
    })
    .then(() => res.status(200).send('Account deleted'))
})

module.exports = router
