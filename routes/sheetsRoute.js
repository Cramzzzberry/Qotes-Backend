// dont forget that you need to respond to a request so that app will not crash in general

// prisma
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

// expressjs
const express = require("express");
const router = express.Router();

// create sheet
router.post("/create-sheet", async (req, res) => {
  const { songTitle, songWritter, songKey, important, pinned } = req.body;

  await prisma.sheets
    .create({
      data: {
        song_title: songTitle,
        song_writter: songWritter,
        song_key: songKey,
        important: important,
        pinned: pinned,
      },
    })
    .then(async (sheet) => {
      res.send(`Sheet created successfully ${sheet.id}`);
    });
});

// retrieve sheets
router.get("/get/all-sheets", async (req, res) => {
  await prisma.sheets
    .findMany({
      select: {
        id: true,
        song_title: true,
        song_writter: true,
        song_key: true,
        important: true,
        pinned: true,
      },
    })
    .then(async (sheets) => {
      res.json(sheets);
    })
    .catch((err) => res.status(500).send("Internal Server Error"));
});

router.get("/get/pinned-sheets", async (req, res) => {
  await prisma.sheets
    .findMany({
      where: {
        pinned: true,
      },
      select: {
        id: true,
        song_title: true,
        song_writter: true,
        song_key: true,
        important: true,
        pinned: true,
      },
    })
    .then(async (sheets) => {
      res.json(sheets);
    })
    .catch((err) => res.status(500).send("Internal Server Error"));
});

router.get("/get/important-sheets", async (req, res) => {
  await prisma.sheets
    .findMany({
      where: {
        important: true,
      },
      select: {
        id: true,
        song_title: true,
        song_writter: true,
        song_key: true,
        important: true,
        pinned: true,
      },
    })
    .then(async (sheets) => {
      res.json(sheets);
    })
    .catch((err) => res.status(500).send("Internal Server Error"));
});

module.exports = router;
