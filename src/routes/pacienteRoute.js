const controller = require ("../controllers/pacienteController"); 

const express = require ("express"); 

const router = express.Router();


router.get("/all", controller.findAllPacientes);
router.get("/login", controller.login)
router.post ("/add", controller.postPaciente);
router.get("/nome", controller.findPacienteNome);
router.get("/:id", controller.findPacienteById);
router.post("/:id", controller.addNovoPaciente);
router.put("/:id", controller.updateCadPaciente);
router.delete("/delete/:id", controller.deleteDadosPaciente);


module.exports = router;