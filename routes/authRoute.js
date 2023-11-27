const express = require('express')
const { PrismaClient, Prisma } = require('@prisma/client')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const router = express.Router()
const prisma = new PrismaClient()

router.post('/', async (req, res) => {
  if (req.body.userId !== undefined || req.get('Authorization').split(' ')[1] !== undefined) {
    await prisma.tokens
      .findFirst({
        where: {
          userId: req.body.userId,
          token: req.get('Authorization').split(' ')[1]
        }
      })
      .then((token) => {
        if (token) {
          res.status(200).send('Account is authenticated')
        } else {
          res.status(401).send('Account is unauthenticated')
        }
      })
      .catch((err) => res.status(500).send(err))
  } else {
    res.status(401).send('Account is unauthenticated')
  }
})

module.exports = router
