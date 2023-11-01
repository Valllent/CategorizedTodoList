const express = require("express");
const categoriesController = require("../../controllers/api/categories-controller");
const tryCatch = require("../../utils/try-catch");


const router = express.Router()

router.get("/", tryCatch(categoriesController.getCategories))
router.post("/", tryCatch(categoriesController.postCategory))
router.delete("/:id", tryCatch(categoriesController.deleteCategory))

module.exports = router