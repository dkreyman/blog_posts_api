const router = require("express").Router();
const controller = require("./posts.controller");
const methodNotAllowed = require("../error/methodNotAllowed");

router
  .route("/ping")
  .get(controller.ping)
  .all(methodNotAllowed);

router
  .route("/posts")
  .get(controller.read)
  .all(methodNotAllowed);



module.exports = router;
