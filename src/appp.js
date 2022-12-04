const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger/swagger_output.json');

require ("dotenv-safe").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./database/dbConnectprojfinal");
const profRoutes = require("./routes/profRoute");
const relatorioRoutes = require("./routes/relatorioRoute");
const pacienteRoutes = require("./routes/pacienteRoute")
mongoose.connect(process.env.DATABASE_PROJ);

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect();

app.use("/clinica/profissional", profRoutes);
app.use("/clinica/relatorio", relatorioRoutes);
app.use("/clinica/paciente", pacienteRoutes);

app.use('/minha-rota-de-documentacao', swaggerUi.serve, swaggerUi.setup(swaggerFile));


module.exports = app;