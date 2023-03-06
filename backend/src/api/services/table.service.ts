import Itable from "../../interfaces/Itables";
import Tables from "../../database/models/table.model";
import statusCode from "../../utils/statusCode";

class TableService {
  private tablesModel;

  constructor() {
    this.tablesModel = Tables;
  }

  async getTables(): Promise<Itable[]> {
    const tables = await this.tablesModel.findAll()
    return tables;
  }

  async getTableById(id: number): Promise<Itable | number> {
    const table = await this.tablesModel.findByPk(id);
    if (!table) return statusCode.NOT_FOUND;
    return table;
  }

  async getOnlyAvailableTables(): Promise<Itable[] | number> {
    const tables = await this.tablesModel.findAll({
      where: { available: true },
    });
    if (!tables) return statusCode.NOT_FOUND;
    return tables;
  }

  async registerTables(table: Itable): Promise<void> {
    await Tables.create(table);
    return;
  }

  async occupyTable(id: number): Promise<void | number> {
    const tableValidation = await this.getTableById(id) as any;
    if (tableValidation === 404) return statusCode.NOT_FOUND;
    if (tableValidation.available === false ) return statusCode.BAD_REQUEST;
    await this.tablesModel.update({ available: false }, { where: { id } });
    return;
  }
}

export default TableService