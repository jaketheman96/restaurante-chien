import TableController from "../api/controllers/table.controller";
import TokenValidator from "../middlewares/tokenValidator";

import express from 'express';

const tableRoute = express.Router();

tableRoute.get('/',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new TableController(req, res, next).getTables()
)

tableRoute.get('/available',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new TableController(req, res, next).getOnlyAvailableTables()
)

tableRoute.post('/',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new TableController(req, res, next).registerTable()
)

export default tableRoute;