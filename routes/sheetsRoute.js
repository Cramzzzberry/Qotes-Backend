const express = require('express')
const { PrismaClient, Prisma } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

const auth = require('../middlewares').auth

//create sheet
router.post('/', auth, async (req, res) => {
  await prisma.sheets
    .create({
      data: {
        song_title: req.body.songTitle,
        artist: req.body.artist,
        song_key: req.body.songKey,
        lineup: req.body.lineup,
        important: req.body.important
      }
    })
    .then(() => res.status(200).send('Sheet created successfully'))
    .catch(err => res.status(500).send(err))
})

//get lineup sheets
router.get('/lineup', auth, async (req, res) => {
  await prisma.sheets
    .findMany({
      where: {
        lineup: true
      },
      select: {
        id: true,
        song_title: true,
        artist: true,
        song_key: true,
        content: true,
        lineup: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })
    .then(data => {
      let sheets = []

      data.forEach(sheet => {
        sheets.push({
          id: sheet.id,
          songTitle: sheet.song_title,
          artist: sheet.artist,
          songKey: sheet.song_key,
          content: sheet.content,
          lineup: sheet.lineup
        })
      })

      res.status(200).send(sheets)
    })
    .catch(err => res.status(500).send(err))
})

//search sheets
router.get('/search/:category', auth, async (req, res) => {
  const search = {
    OR: [
      {
        song_title: {
          startsWith: req.query.search,
          mode: 'insensitive'
        }
      },
      {
        song_title: {
          endsWith: req.query.search,
          mode: 'insensitive'
        }
      },
      {
        song_title: {
          contains: req.query.search,
          mode: 'insensitive'
        }
      },
      {
        artist: {
          startsWith: req.query.search,
          mode: 'insensitive'
        }
      },
      {
        artist: {
          endsWith: req.query.search,
          mode: 'insensitive'
        }
      },
      {
        artist: {
          contains: req.query.search,
          mode: 'insensitive'
        }
      }
    ]
  }

  await prisma.sheets
    .findMany({
      ...(req.query.lastId
        ? {
            skip: 1,
            cursor: {
              id: req.query.lastId
            }
          }
        : {}),
      take: 39,
      where: {
        ...search,
        ...(req.params.category === 'lineup'
          ? {
              lineup: true
            }
          : req.params.category === 'important'
          ? {
              important: true
            }
          : {}),
        ...(req.query.key !== 'All Keys'
          ? {
              song_key: req.query.key
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
    .then(data => {
      let sheets = []

      data.forEach(sheet => {
        sheets.push({
          id: sheet.id,
          songTitle: sheet.song_title,
          artist: sheet.artist,
          songKey: sheet.song_key,
          important: sheet.important,
          lineup: sheet.lineup
        })
      })

      res.status(200).send(sheets)
    })
    .catch(err => res.status(500).send(err))
})

//get sheet
router.get('/:id', auth, async (req, res) => {
  await prisma.sheets
    .findUnique({
      where: { id: req.params.id },
      select: {
        song_title: true,
        artist: true,
        song_key: true,
        content: true
      }
    })
    .then(sheet => {
      res.status(200).send({
        songTitle: sheet.song_title,
        artist: sheet.artist,
        songKey: sheet.song_key,
        content: sheet.content
      })
    })
    .catch(err => res.status(500).send(err))
})

//update sheets
router.put('/', auth, async (req, res) => {
  await prisma.sheets
    .updateMany({
      where: {
        id: { in: req.body.ids }
      },

      data: {
        updatedAt: new Date(),
        ...req.body.data
      }
    })
    .then(() => res.status(200).send(req.body.ids.length > 1 ? `(${req.body.ids.length}) sheets updated` : 'Sheet updated successfully'))
    .catch(err => res.status(500).send(err))
})

//update sheet
router.put('/:id', auth, async (req, res) => {
  await prisma.sheets
    .update({
      where: { id: req.params.id },
      data: {
        updatedAt: new Date(),
        song_title: req.body.songTitle,
        artist: req.body.artist,
        song_key: req.body.songKey,
        content: req.body.content
      }
    })
    .then(() => res.status(200).send('Sheet updated successfully'))
    .catch(err => res.status(500).send(err))
})

//delete sheet/s
router.delete('/', auth, async (req, res) => {
  await prisma.sheets
    .deleteMany({
      where: {
        id: { in: req.body.ids }
      }
    })
    .then(() => res.status(200).send(req.body.ids.length > 1 ? `(${req.body.ids.length}) sheets deleted` : 'Sheet deleted successfully'))
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
})

module.exports = router
