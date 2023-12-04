// prisma
const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

// expressjs
const express = require('express')

module.exports = function (io) {
  const router = express.Router()

  //socket io
  io.on('connection', (socket) => {
    // create sheet
    socket.on('create sheet', async (req) => {
      await prisma.sheets
        .create({ data: req })
        .then(() => socket.broadcast.emit('toast', 'A sheet is created.', 4000))
        .catch((err) => res.status(500).send(err))
    })

    //update sheets
    socket.on('update sheets', async (req) => {
      await prisma.sheets
        .updateMany({
          where: {
            id: { in: req.ids }
          },

          data: {
            updatedAt: new Date(),
            ...req.data
          }
        })
        .then(() => socket.broadcast.emit('toast', req.ids.length > 1 ? `(${req.ids.length}) sheets updated.` : 'A sheet is updated.', 4000))
        .catch((err) => res.status(500).send(err))
    })

    //delete sheets
    socket.on('delete sheets', async (req) => {
      await prisma.sheets
        .deleteMany({
          where: {
            id: { in: req.ids }
          }
        })
        .then(() => socket.broadcast.emit('toast', req.ids.length > 1 ? `(${req.ids.length}) sheets deleted.` : 'A sheet is deleted.', 4000))
        .catch((err) => res.status(500).send(err))
    })
  })

  // get specific sheet
  router.get('/get/sheet/:id', async (req, res) => {
    await prisma.sheets
      .findUnique({
        where: {
          id: req.params.id
        },
        select: {
          song_title: true,
          artist: true,
          song_key: true,
          content: true
        }
      })
      .then((sheet) => res.status(200).json(sheet))
      .catch((err) => res.status(500).send(err))
  })

  // update sheet
  router.put('/update-sheet/:id', async (req, res) => {
    await prisma.sheets
      .update({
        where: {
          id: req.params.id
        },

        data: {
          updatedAt: new Date(),
          ...req.body
        }
      })
      .then(() => res.status(200).send('Sheet updated'))
      .catch((err) => res.status(500).send(err))
  })

  // search sheets
  router.post('/search/', async (req, res) => {
    const searchFor = [
      {
        song_title: {
          startsWith: req.body.searchInput,
          mode: 'insensitive'
        }
      },
      {
        song_title: {
          endsWith: req.body.searchInput,
          mode: 'insensitive'
        }
      },
      {
        song_title: {
          contains: req.body.searchInput,
          mode: 'insensitive'
        }
      },
      {
        artist: {
          startsWith: req.body.searchInput,
          mode: 'insensitive'
        }
      },
      {
        artist: {
          endsWith: req.body.searchInput,
          mode: 'insensitive'
        }
      },
      {
        artist: {
          contains: req.body.searchInput,
          mode: 'insensitive'
        }
      }
    ]

    await prisma.sheets
      .findMany({
        ...(req.body.last_id
          ? {
              cursor: {
                id: req.body.last_id
              }
            }
          : {}),
        ...(req.body.last_id ? { skip: 1 } : {}),
        take: 39,
        where: {
          OR: searchFor,
          ...(req.body.key !== 'All Keys'
            ? {
                song_key: req.body.key
              }
            : {}),
          ...(req.body.tag === 'lineup'
            ? {
                lineup: true
              }
            : req.body.tag === 'important-sheets'
            ? {
                important: true
              }
            : {})
        },
        select: {
          id: true,
          song_title: true,
          artist: true,
          song_key: true,
          important: true,
          lineup: true
        },
        orderBy: {
          updatedAt: 'desc'
        }
      })
      .then((sheets) => {
        res.status(200).json(sheets)
      })
      .catch((err) => res.status(500).send(err))
  })

  // retrieve sheets: this is used when the searchbar is empty
  router.post('/get/sheets', async (req, res) => {
    await prisma.sheets
      .findMany({
        ...(req.body.last_id
          ? {
              cursor: {
                id: req.body.last_id
              }
            }
          : {}),
        ...(req.body.last_id ? { skip: 1 } : {}),
        ...(req.body.key !== 'All Keys'
          ? {
              where: {
                song_key: req.body.key,
                ...(req.body.tag === 'lineup'
                  ? {
                      lineup: true
                    }
                  : req.body.tag === 'important-sheets'
                  ? {
                      important: true
                    }
                  : {})
              }
            }
          : {
              where: {
                ...(req.body.tag === 'lineup'
                  ? {
                      lineup: true
                    }
                  : req.body.tag === 'important-sheets'
                  ? {
                      important: true
                    }
                  : {})
              }
            }),
        take: 39,
        select: {
          id: true,
          song_title: true,
          artist: true,
          song_key: true,
          important: true,
          lineup: true
        },
        orderBy: {
          updatedAt: 'desc'
        }
      })
      .then((sheets) => {
        res.status(200).json(sheets)
      })
      .catch((err) => res.send(err))
  })

  return router
}
