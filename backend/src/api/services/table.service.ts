import Itable from "../../interfaces/Itables";
import Tables from "../../database/models/table.model";
import statusCode from "../../utils/statusCode";

class TableService {
  private tablesModel: typeof Tables;

  constructor() {
    this.tablesModel = Tables;
  }

  async getTables(): Promise<Itable[]> {
    const tables = await this.tablesModel.findAll()
    return tables;
  }

  async getTableById(tableId: number): Promise<Itable | number> {
    const table = await this.tablesModel.findByPk(tableId);
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

  async occupyTable(tableId: number): Promise<void | number> {
    const tableValidation = await this.getTableById(tableId) as any;
    if (tableValidation === 404) return statusCode.NOT_FOUND;
    if (tableValidation.available === false) return statusCode.BAD_REQUEST;
    await this.tablesModel.update({ available: false }, { where: { id: tableId } });
    return;
  }

  async deleteTable(tableId: number): Promise<void | number> {
    const tableValidation = await this.getTableById(tableId);
    if (tableValidation === 404) return statusCode.NOT_FOUND;
    await this.tablesModel.destroy({ where: { id: tableId } });
    return;
  }
}

export default TableService