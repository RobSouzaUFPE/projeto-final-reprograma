const controller = require ("../controllers/profController"); 

const express = require ("express"); 

const router = express.Router();


router.get("/all", controller.findAllProfissionais);
router.get("/login", controller.login)
router.post ("/add", controller.postProfissional);
router.get("/funcao", controller.findFuncao,);
router.get("/nome", controller.findProfissionalNome);
router.get("/:id", controller.findProfById);
router.put("/:id", controller.updateCadProfissional);
router.delete("/delete/:id", controller.deleteDadosProfissional);


module.exports = router;