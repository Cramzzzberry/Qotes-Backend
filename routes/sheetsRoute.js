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
      res.status(200).json({
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
      res.status(200).json(sheet)
    })
})

// retrieve sheets
router.get('/get/:category/:key', async (req, res) => {
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
  } else if (req.params.category === 'pinned-sheets') {
    if (req.params.key === 'all-keys') {
      await prisma.sheets
        .findMany({
          where: {
            pinned: true
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
            pinned: true,
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
  } else if (req.params.category === 'important-sheets') {
    if (req.params.key === 'all-keys') {
      await prisma.sheets
        .findMany({
          where: {
            important: true
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
            important: true,
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
  res.status(200).send('updated sheet')
})

//update sheets
router.put('/update-sheets', async (req, res) => {
  await prisma.sheets.updateMany({
    where: {
      id: { in: req.body.ids }
    },

    data: req.body.data
  })
  res.status(200).send('updated sheets')
})

// delete sheets
router.delete('/delete-sheets', async (req, res) => {
  await prisma.sheets
    .deleteMany({
      where: {
        id: { in: req.body.ids }
      }
    })
    .then((sheets) => res.status(200).send('sheet/s deleted'))
    .catch((err) => console.log(err))
})

// search sheets
router.get('/search/:category/:key/:sheetName', async (req, res) => {
  const searchFor = [
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

  if (req.params.category === 'all-sheets') {
    if (req.params.key === 'all-keys') {
      await prisma.sheets
        .findMany({
          where: {
            OR: searchFor
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
          res.status(200).json(sheets)
        })
    } else {
      await prisma.sheets
        .findMany({
          where: {
            OR: searchFor,
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
          res.status(200).json(sheets)
        })
    }
  } else if (req.params.category === 'pinned-sheets') {
    if (req.params.key === 'all-keys') {
      await prisma.sheets
        .findMany({
          where: {
            OR: searchFor,
            pinned: true
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
          res.status(200).json(sheets)
        })
    } else {
      await prisma.sheets
        .findMany({
          where: {
            OR: searchFor,
            pinned: true,
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
          res.status(200).json(sheets)
        })
    }
  } else if (req.params.category === 'important-sheets') {
    if (req.params.key === 'all-keys') {
      await prisma.sheets
        .findMany({
          where: {
            OR: searchFor,
            important: true
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
          res.status(200).json(sheets)
        })
    } else {
      await prisma.sheets
        .findMany({
          where: {
            OR: searchFor,
            important: true,
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
          res.status(200).json(sheets)
        })
    }
  }
})

module.exports = router
