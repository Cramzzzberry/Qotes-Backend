const express = require('express')
const { PrismaClient, Prisma } = require('@prisma/client')
const crypto = require('crypto')

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
          res.status(409).send(err)
        }
      } else {
        res.status(500).send(err)
      }
    })
})

//log account
router.post('/login-account', async (req, res) => {
  await prisma.user
    .findUnique({
      where: {
        email: req.body.email
      },
      select: { email: true, id: true, password: true, approved: true }
    })
    .then(async (user) => {
      // if user exists
      if (user !== null) {
        if (req.body.password === user.password) {
          if (user.approved) {
            const token = crypto.randomBytes(64).toString('hex')

            await prisma.tokens
              .create({
                data: {
                  userId: user.id,
                  token: token
                }
              })
              .then(() => {
                res.status(200).json({
                  message: 'successfully logged in!',
                  userId: user.id,
                  token: token
                })
              })
              .catch((err) => res.status(500).send(err))
          } else {
            res.status(401).json({
              message: 'Account not yet approved.'
            })
          }
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
    .catch((err) => res.status(500).send(err))
})

//delete token on logout
router.delete('/logout-account', async (req, res) => {
  await prisma.tokens
    .delete({
      where: {
        token: req.get('Authorization').split(' ')[1]
      }
    })
    .then(() => res.status(200).send('token deleted'))
    .catch((err) => res.status(400).send(err))
})

//get user details
router.get('/get-user/:id', async (req, res) => {
  await prisma.user
    .findUnique({
      where: {
        id: req.params.id
      }
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).send(err))
})

//update user account
router.put('/update-account/:id', async (req, res) => {
  await prisma.user
    .update({
      where: {
        id: req.params.id
      },
      data: req.body
    })
    .catch((err) => res.status(500).send(err))

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
    .catch((err) => res.status(500).send(err))
})

module.exports = router
