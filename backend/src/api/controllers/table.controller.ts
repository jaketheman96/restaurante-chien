import { NextFunction, Request, Response } from "express";
import TableService from "../services/table.service";
import statusCode from "../../utils/statusCode";

class TableController {
  private _req: Request;
  private _res: Response;
  private tableService: TableService

  constructor(req: Request, res: Response, _next: NextFunction) {
    this._req = req;
    this._res = res;
    this.tableService = new TableService()
  }

  async getTables(): Promise<Response | void> {
    const tables = await this.tableService.getTables();
    return this._res.status(statusCode.OK).json(tables);
  };

  async getTableById(): Promise<Response | void> {
    const table = await this.tableService.getTableById(Number(this._req.params.id));
    if (table === 404) return this._res.status(statusCode.NOT_FOUND)
      .json({ message: 'No such table with this id!' });
    return this._res.status(statusCode.OK).json(table);
  }

  async getOnlyAvailableTables(): Promise<Response | void> {
    const tables = await this.tableService.getOnlyAvailableTables();
    if (tables === 404) return this._res.status(statusCode.NOT_FOUND)
      .json({ message: 'No tables available' })
    return this._res.status(statusCode.OK).json(tables)
  };

  async registerTable(): Promise<Response | void> {
    await this.tableService.registerTables(this._req.body);
    return this._res.status(statusCode.CREATED).json({ message: 'Table registered!' })
  }

  async occupyTable(): Promise<Response | void> {
    const table = await this.tableService.occupyTable(Number(this._req.params.id));
    if (table === 404) return this._res.status(statusCode.NOT_FOUND)
      .json({ message: 'Table not found' });
    return this._res.status(statusCode.OK).json({ message: 'Table availability changed!' })
  }
}


export default TableController;