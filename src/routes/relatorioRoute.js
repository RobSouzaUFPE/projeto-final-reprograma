const controller = require("../controllers/relatorioController"); 

const express = require("express"); 

const router = express.Router();


router.get("/all", controller.findAllRelatorios);
router.get("/nome", controller.findNomeAtendimento);
router.get("/:id", controller.findRelatorioById);
router.post("/add", controller.addNewRelatorio);
router.put("/:id", controller.updateRelatorio);
router.delete("/delete/:id", controller.deleteRelatorio);


module.exports = router;