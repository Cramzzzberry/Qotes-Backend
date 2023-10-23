// dont forget that you need to respond to a request so that app will not crash in general

// prisma
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

// expressjs
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  await prisma.auth_Tokens
    .findUnique({
      where: {
        token: req.body.token,
      },
    })
    .then((authToken) => {
      if (authToken !== null) {
        res.json({
          authenticated: true,
        });
      } else {
        res.json({
          authenticated: false,
        });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
