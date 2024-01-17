const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

exports.auth = async function (req, res, next) {
  if (req.body.userId !== undefined || req.headers.authorization !== undefined) {
    await prisma.tokens
      .findFirst({
        where: {
          userId: req.body.userId,
          token: req.headers.authorization
        }
      })
      .then((token) => {
        if (token) {
          next()
        } else {
          res.status(401).send('Account is unauthenticated')
        }
      })
      .catch((err) => res.status(500).send(err))
  } else {
    res.status(401).send('Account is unauthenticated')
  }
}

exports.findUser = async function (req, res, next) {
  await prisma.user
    .findUnique({
      where: {
        email: req.body.email
      },
      select: { id: true, password: true, approved: true }
    })
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => res.status(500).send(err))
}

exports.deleteToken = async function (req, res, next) {
  await prisma.tokens
    .delete({
      where: {
        token: req.headers.authorization
      }
    })
    .then(() => next())
    .catch((err) => res.status(500).send(err))
}
