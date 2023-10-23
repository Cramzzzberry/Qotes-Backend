// dont forget that you need to respond to a request so that app will not crash in general

// prisma
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

// expressjs
const express = require("express");
const router = express.Router();

// node js
const crypto = require("crypto");

async function generateAuthToken(user, authToken, req, res) {
  // if token exists
  if (authToken !== null) {
    await prisma.auth_Tokens
      .update({
        where: {
          user_id: user.id,
        },

        data: {
          token: crypto.randomBytes(16).toString("hex"),
        },
      })
      .then((genAuthToken) => {
        res.json({
          success: true,
          message: "successfully logged in!",
          userId: user.id,
          token: genAuthToken.token,
        });
      })
      .catch((err) => console.log(err));
  } else {
    await prisma.auth_Tokens
      .create({
        data: {
          user_id: user.id,
          token: crypto.randomBytes(16).toString("hex"),
        },
      })
      .then((genAuthToken) => {
        res.json({
          success: true,
          message: "successfully logged in!",
          userId: user.id,
          token: genAuthToken.token,
        });
      })
      .catch((err) => console.log(err));
  }
}

router.post("/signup", async (req, res) => {
  await prisma.user
    .create({ data: req.body })
    .then(() => {
      res.json({
        success: true,
        message: "Successfully created an account!",
      });
    })
    .catch((err) => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          console.log(
            "There is a unique constraint violation, a new user cannot be created with this email"
          );
        }
      }
      res.status(500).json({
        message: "Internal Server Error",
      });
    });
});

router.post("/login", async (req, res) => {
  await prisma.user
    .findUnique({
      where: req.body,
      select: { id: true },
    })
    .then(async (user) => {
      // if user exists
      if (user !== null) {
        await prisma.auth_Tokens
          .findUnique({
            where: {
              user_id: user.id,
            },
          })
          .then(async (authToken) => {
            await generateAuthToken(user, authToken, req, res);
          })
          .catch((err) => console.log(err));
      } else {
        res.json({
          success: false,
          message: "Wrong email/password!",
        });
      }
    })
    .catch((err) => res.status(500).send("Internal Server Error"));
});

router.get("/user/:userId", async (req, res) => {
  await prisma.user
    .findUnique({
      where: {
        id: req.params.userId,
      },
    })
    .then(async (user) => {
      console.log(user);
      res.json(user);
    })
    .catch((err) => res.status(500).send("Internal Server Error"));
});

router.put("/update-account", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.body.id,
    },
    data: req.body,
  });
  res.send("updating user");
});

router.delete("/delete-account", (req, res) => {
  //will get the id of the user
  res.send("deleting user");
});

module.exports = router;
