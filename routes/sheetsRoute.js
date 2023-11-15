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
      await prisma.sheets.create({ data: req }).then(() => socket.broadcast.emit('toast', 'A sheet is created.', 4000))
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
          song_writer: true,
          song_key: true,
          content: true
        }
      })
      .then((sheet) => {
        res.status(200).json(sheet)
      })
  })

  // update sheet
  router.put('/update-sheet/:id', async (req, res) => {
    await prisma.sheets.update({
      where: {
        id: req.params.id
      },

      data: {
        updatedAt: new Date(),
        ...req.body
      }
    })
    res.status(200).send('updated sheet')
  })

  // search sheets
  router.post('/search/', async (req, res) => {
    const searchFor = [
      {
        song_title: {
          startsWith: req.body.searchInput
        }
      },
      {
        song_title: {
          endsWith: req.body.searchInput
        }
      },
      {
        song_title: {
          contains: req.body.searchInput
        }
      },
      {
        song_writer: {
          startsWith: req.body.searchInput
        }
      },
      {
        song_writer: {
          endsWith: req.body.searchInput
        }
      },
      {
        song_writer: {
          contains: req.body.searchInput
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
          ...(req.body.key !== 'all-keys'
            ? {
                song_key: req.body.key
              }
            : {}),
          ...(req.body.tag === 'pinned-sheets'
            ? {
                pinned: true
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
          song_writer: true,
          song_key: true,
          important: true,
          pinned: true
        },
        orderBy: {
          updatedAt: 'desc'
        }
      })
      .then(async (sheets) => {
        res.status(200).json(sheets)
      })
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
        ...(req.body.key !== 'all-keys'
          ? {
              where: {
                song_key: req.body.key,
                ...(req.body.tag === 'pinned-sheets'
                  ? {
                      pinned: true
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
                ...(req.body.tag === 'pinned-sheets'
                  ? {
                      pinned: true
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
          song_writer: true,
          song_key: true,
          important: true,
          pinned: true
        },
        orderBy: {
          updatedAt: 'desc'
        }
      })
      .then(async (sheets) => {
        res.json(sheets)
      })
  })

  return router
}
