import TableController from "../api/controllers/TableController";
import TokenValidator from "../middlewares/TokenValidator";

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

tableRoute.put('/available/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new TableController(req, res, next).occupyTable(),
)

tableRoute.get('/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new TableController(req, res, next).getTableById()
)

tableRoute.delete('/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new TableController(req, res, next).deleteTable()
)

tableRoute.post('/',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new TableController(req, res, next).registerTable()
)

export default tableRoute;