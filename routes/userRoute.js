// dont forget that you need to respond to a request so that app will not crash in general

// prisma
const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

// expressjs
const express = require('express')
const router = express.Router()

// node js
const crypto = require('crypto')

// create account
router.post('/create-account', async (req, res) => {
  await prisma.user
    .create({ data: req.body })
    .then(() => {
      res.json({
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
      where: req.body,
      select: { email: true, id: true }
    })
    .then(async (user) => {
      // if user exists
      if (user !== null) {
        await prisma.auth_Tokens
          .create({
            data: {
              user_email: user.email,
              token: crypto.randomBytes(16).toString('hex')
            }
          })
          .then((genAuthToken) => {
            res.json({
              success: true,
              message: 'successfully logged in!',
              userId: user.id,
              token: genAuthToken.token
            })
          })
          .catch((err) => console.log(err))
      } else {
        res.json({
          success: false,
          message: 'Wrong email/password!'
        })
      }
    })
    .catch((err) => res.status(500).send('Internal Server Error'))
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
      res.json(user)
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

  res.send('updating user')
})

//delete user account
router.delete('/delete-account/:id', async (req, res) => {
  await prisma.user
    .delete({
      where: {
        id: req.params.id
      }
    })
    .then(() => res.send('Account deleted'))
})

module.exports = router
