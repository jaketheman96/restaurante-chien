import { NextFunction, Request, Response } from "express";
import TableService from "../services/TableService";
import statusCode from "../../utils/statusCode";

class TableController {
  private _req: Request;
  private _res: Response;
  private tableService: TableService;
  private tableNotFound: Object;

  constructor(req: Request, res: Response, _next: NextFunction) {
    this._req = req;
    this._res = res;
    this.tableService = new TableService();
    this.tableNotFound = { message: 'No such table with this id!' };
  }

  async getTables(): Promise<Response> {
    const tables = await this.tableService.getTables();
    return this._res.status(statusCode.OK).json(tables);
  };

  async getTableById(): Promise<Response> {
    const table = await this.tableService.getTableById(Number(this._req.params.id));
    if (table === 404) return this._res.status(statusCode.NOT_FOUND)
      .json(this.tableNotFound);
    return this._res.status(statusCode.OK).json(table);
  }

  async getOnlyAvailableTables(): Promise<Response> {
    const tables = await this.tableService.getOnlyAvailableTables();
    if (tables === 404) return this._res.status(statusCode.NOT_FOUND)
      .json({ message: 'No tables available' })
    return this._res.status(statusCode.OK).json(tables)
  };

  async registerTable(): Promise<Response> {
    await this.tableService.registerTables(this._req.body);
    return this._res.status(statusCode.CREATED).json({ message: 'Table registered!' })
  }

  async occupyTable(): Promise<Response> {
    const table = await this.tableService.occupyTable(Number(this._req.params.id));
    if (table === 404) return this._res.status(statusCode.NOT_FOUND)
      .json(this.tableNotFound);
    if (table === 400) return this._res.status(statusCode.BAD_REQUEST)
      .json({ message: 'Table already occupied' })
    return this._res.status(statusCode.OK)
      .json({ message: 'Table availability changed!' })
  }

  async deleteTable(): Promise<Response> {
    const { id } = this._req.params;
    const response = await this.tableService.deleteTable(Number(id));
    if (response === 404) return this._res.status(statusCode.NOT_FOUND)
      .json(this.tableNotFound);
    return this._res.status(statusCode.OK).json({ message: 'Table deleted!' })
  }
}


export default TableController;