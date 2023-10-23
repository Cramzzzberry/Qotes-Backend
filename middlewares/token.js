const crypto = require("crypto");

// prisma
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  generateToken: async function (req, res, next) {
    next();
  },
};
