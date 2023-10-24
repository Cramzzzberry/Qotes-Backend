// dont forget that you need to respond to a request so that app will not crash in general

// prisma
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

// expressjs
const express = require("express");
const router = express.Router();

// create sheet
router.post("/create-sheet", async (req, res) => {
  await prisma.sheets
    .create({
      data: req.body,
    })
    .then(async (sheet) => {
      res.json({
        success: true,
      });
    });
});

// update sheet
router.put("/update-sheet/:id", async (req, res) => {
  await prisma.sheets.update({
    where: {
      id: req.params.id,
    },

    data: req.body,
  });
  res.send("updating sheet");
});

// delete sheet
router.delete("/delete-sheet/:id", async (req, res) => {
  await prisma.sheets
    .delete({
      where: {
        id: req.params.id,
      },
    })
    .then(() => res.send("Sheet deleted"));
});

// retrieve sheets
router.get("/get/all-sheets", async (req, res) => {
  await prisma.sheets
    .findMany({
      select: {
        id: true,
        song_title: true,
        song_writer: true,
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

router.get("/get/all-sheets/:sheetName", async (req, res) => {
  await prisma.sheets
    .findMany({
      where: {
        OR: [
          {
            song_title: {
              startsWith: req.params.sheetName,
            },
          },
          {
            song_title: {
              endsWith: req.params.sheetName,
            },
          },
          {
            song_title: {
              contains: req.params.sheetName,
            },
          },
          {
            song_writer: {
              startsWith: req.params.sheetName,
            },
          },
          {
            song_writer: {
              endsWith: req.params.sheetName,
            },
          },
          {
            song_writer: {
              contains: req.params.sheetName,
            },
          },
        ],
      },
    })
    .then(async (sheets) => {
      res.json(sheets);
    });
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
        song_writer: true,
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

router.get("/get/pinned-sheets/:sheetName", async (req, res) => {
  await prisma.sheets
    .findMany({
      where: {
        OR: [
          {
            song_title: {
              startsWith: req.params.sheetName,
            },
            pinned: true,
          },
          {
            song_title: {
              endsWith: req.params.sheetName,
            },
            pinned: true,
          },
          {
            song_title: {
              contains: req.params.sheetName,
            },
            pinned: true,
          },
          {
            song_writer: {
              startsWith: req.params.sheetName,
            },
            pinned: true,
          },
          {
            song_writer: {
              endsWith: req.params.sheetName,
            },
            pinned: true,
          },
          {
            song_writer: {
              contains: req.params.sheetName,
            },
            pinned: true,
          },
        ],
      },
    })
    .then(async (sheets) => {
      res.json(sheets);
    });
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
        song_writer: true,
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

router.get("/get/important-sheets/:sheetName", async (req, res) => {
  await prisma.sheets
    .findMany({
      where: {
        OR: [
          {
            song_title: {
              startsWith: req.params.sheetName,
            },
            important: true,
          },
          {
            song_title: {
              endsWith: req.params.sheetName,
            },
            important: true,
          },
          {
            song_title: {
              contains: req.params.sheetName,
            },
            important: true,
          },
          {
            song_writer: {
              startsWith: req.params.sheetName,
            },
            important: true,
          },
          {
            song_writer: {
              endsWith: req.params.sheetName,
            },
            important: true,
          },
          {
            song_writer: {
              contains: req.params.sheetName,
            },
            important: true,
          },
        ],
      },
    })
    .then(async (sheets) => {
      res.json(sheets);
    });
});

//get specific sheet
router.get("/get/sheet/:id", async (req, res) => {
  await prisma.sheets
    .findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        song_title: true,
        song_writer: true,
        song_key: true,
        content: true,
      },
    })
    .then((sheet) => {
      console.log(sheet);
      res.json(sheet);
    });
});

module.exports = router;
