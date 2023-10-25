// prisma
const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

// expressjs
const express = require('express')
const router = express.Router()

// create sheet
router.post('/create-sheet', async (req, res) => {
  await prisma.sheets
    .create({
      data: req.body
    })
    .then(async (sheet) => {
      res.json({
        success: true
      })
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
      res.json(sheet)
    })
})

// retrieve sheets
router.get('/get/:category/:key', async (req, res) => {
  const isPinnedQuery = req.params.category === 'pinned-sheets' ? true : false
  const isImportantQuery = req.params.category === 'important-sheets' ? true : false

  console.log(isImportantQuery)
  if (req.params.category === 'all-sheets') {
    if (req.params.key === 'all-keys') {
      await prisma.sheets
        .findMany({
          select: {
            id: true,
            song_title: true,
            song_writer: true,
            song_key: true,
            important: true,
            pinned: true
          }
        })
        .then(async (sheets) => {
          res.json(sheets)
        })
    } else {
      await prisma.sheets
        .findMany({
          where: {
            song_key: req.params.key
          },
          select: {
            id: true,
            song_title: true,
            song_writer: true,
            song_key: true,
            important: true,
            pinned: true
          }
        })
        .then(async (sheets) => {
          res.json(sheets)
        })
    }
  } else {
    if (req.params.key === 'all-keys') {
      await prisma.sheets
        .findMany({
          where: {
            pinned: isPinnedQuery,
            important: isImportantQuery
          },
          select: {
            id: true,
            song_title: true,
            song_writer: true,
            song_key: true,
            important: true,
            pinned: true
          }
        })
        .then(async (sheets) => {
          res.json(sheets)
        })
    } else {
      await prisma.sheets
        .findMany({
          where: {
            pinned: isPinnedQuery,
            important: isImportantQuery,
            song_key: req.params.key
          },
          select: {
            id: true,
            song_title: true,
            song_writer: true,
            song_key: true,
            important: true,
            pinned: true
          }
        })
        .then(async (sheets) => {
          res.json(sheets)
        })
    }
  }
})

// update sheet
router.put('/update-sheet/:id', async (req, res) => {
  await prisma.sheets.update({
    where: {
      id: req.params.id
    },

    data: req.body
  })
  res.send('updating sheet')
})

// delete sheet
router.delete('/delete-sheet/:id', async (req, res) => {
  await prisma.sheets
    .delete({
      where: {
        id: req.params.id
      }
    })
    .then(() => res.send('Sheet deleted'))
})

// search sheets
router.get('/search/:category/:key/:sheetName', async (req, res) => {
  const isPinnedQuery = req.params.category === 'pinned-sheets' ? true : false
  const isImportantQuery = req.params.category === 'important-sheets' ? true : false

  console.log(req.params.key)

  if (req.params.category === 'all-sheets') {
    if (req.params.key === 'all-keys') {
      await prisma.sheets
        .findMany({
          where: {
            OR: [
              {
                song_title: {
                  startsWith: req.params.sheetName
                }
              },
              {
                song_title: {
                  endsWith: req.params.sheetName
                }
              },
              {
                song_title: {
                  contains: req.params.sheetName
                }
              },
              {
                song_writer: {
                  startsWith: req.params.sheetName
                }
              },
              {
                song_writer: {
                  endsWith: req.params.sheetName
                }
              },
              {
                song_writer: {
                  contains: req.params.sheetName
                }
              }
            ]
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
            song_title: 'asc'
          }
        })
        .then(async (sheets) => {
          res.json(sheets)
        })
    } else {
      await prisma.sheets
        .findMany({
          where: {
            OR: [
              {
                song_title: {
                  startsWith: req.params.sheetName
                }
              },
              {
                song_title: {
                  endsWith: req.params.sheetName
                }
              },
              {
                song_title: {
                  contains: req.params.sheetName
                }
              },
              {
                song_writer: {
                  startsWith: req.params.sheetName
                }
              },
              {
                song_writer: {
                  endsWith: req.params.sheetName
                }
              },
              {
                song_writer: {
                  contains: req.params.sheetName
                }
              }
            ],
            song_key: req.params.key
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
            song_title: 'asc'
          }
        })
        .then(async (sheets) => {
          res.json(sheets)
        })
    }
  } else {
    if (req.params.key === 'all-keys') {
      await prisma.sheets
        .findMany({
          where: {
            OR: [
              {
                song_title: {
                  startsWith: req.params.sheetName
                }
              },
              {
                song_title: {
                  endsWith: req.params.sheetName
                }
              },
              {
                song_title: {
                  contains: req.params.sheetName
                }
              },
              {
                song_writer: {
                  startsWith: req.params.sheetName
                }
              },
              {
                song_writer: {
                  endsWith: req.params.sheetName
                }
              },
              {
                song_writer: {
                  contains: req.params.sheetName
                }
              }
            ],
            pinned: isPinnedQuery,
            important: isImportantQuery
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
            song_title: 'asc'
          }
        })
        .then(async (sheets) => {
          res.json(sheets)
        })
    } else {
      await prisma.sheets
        .findMany({
          where: {
            OR: [
              {
                song_title: {
                  startsWith: req.params.sheetName
                }
              },
              {
                song_title: {
                  endsWith: req.params.sheetName
                }
              },
              {
                song_title: {
                  contains: req.params.sheetName
                }
              },
              {
                song_writer: {
                  startsWith: req.params.sheetName
                }
              },
              {
                song_writer: {
                  endsWith: req.params.sheetName
                }
              },
              {
                song_writer: {
                  contains: req.params.sheetName
                }
              }
            ],
            pinned: isPinnedQuery,
            important: isImportantQuery,
            song_key: req.params.key
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
            song_title: 'asc'
          }
        })
        .then(async (sheets) => {
          res.json(sheets)
        })
    }
  }
})

module.exports = router
