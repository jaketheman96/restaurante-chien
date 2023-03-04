import { NextFunction, Request, Response } from "express";
import TableService from "../services/table.service";
import statusCode from "../../utils/statusCode";

class TableController {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  private tableService: TableService

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
    this.tableService = new TableService()
  }

  async getTables(): Promise<Response | void> {
    try {
      const tables = await this.tableService.getTables();
      return this._res.status(statusCode.OK).json(tables);
    } catch (error) {
      this._next(error);
    }
  };

  async getTableById(): Promise<Response | void> {
    try {
      const table = await this.tableService.getTableById(Number(this._req.params.id));
      if (!table) return this._res.status(statusCode.NOT_FOUND)
        .json({ message: 'No such table with this id!' });
      return this._res.status(statusCode.OK).json(table);
    } catch (error) {
      this._next(error);
    }
  }

  async getOnlyAvailableTables(): Promise<Response | void> {
    try {
      const tables = await this.tableService.getOnlyAvailableTables();
      if (tables === 404) return this._res.status(statusCode.NOT_FOUND).json({ message: 'No tables available' })
      return this._res.status(statusCode.OK).json(tables)
    } catch (error) {
      this._next(error);
    }
  };

  async registerTable(): Promise<Response | void> {
    try {
      await this.tableService.registerTables(this._req.body);
      return this._res.status(statusCode.CREATED).json({ message: 'Table registered!' })
    } catch (error) {
      this._next(error);
    }
  }

  async occupyTable() {
    try {
      await this.tableService.occupyTable(Number(this._req.params.id))
      return
    } catch (error) {

    }
  }
}


export default TableController;