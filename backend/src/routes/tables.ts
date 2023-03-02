import { NextFunction, Request, Response } from "express";
import TableController from "../api/controllers/table.controller";
import TokenValidator from "../middlewares/tokenValidator";

import express from 'express';

const tableRoute = express.Router();

tableRoute.get('/',
  (req: Request, res: Response, next: NextFunction) => new TokenValidator(req, res, next).validator(),
  (req: Request, res: Response, next: NextFunction) => new TableController(req, res, next).getTables()
)

tableRoute.get('/available',
  (req: Request, res: Response, next: NextFunction) => new TokenValidator(req, res, next).validator(),
  (req: Request, res: Response, next: NextFunction) => new TableController(req, res, next).getOnlyAvailableTables()
)

tableRoute.post('/',
  (req: Request, res: Response, next: NextFunction) => new TokenValidator(req, res, next).validator(),
  (req: Request, res: Response, next: NextFunction) => new TableController(req, res, next).registerTable()
)

export default tableRoute;