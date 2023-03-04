import Itable from "../../interfaces/Itables";
import Tables from "../../database/models/table.model";
import statusCode from "../../utils/statusCode";

class TableService {
  async getTables(): Promise<Itable[]> {
    const tables = await Tables.findAll()
    return tables;
  }

  async getTableById(id: number): Promise<Itable | number> {
    const table = await Tables.findByPk(id);
    console.log(table)
    if (!table) return statusCode.NOT_FOUND;
    return table;
  }

  async getOnlyAvailableTables(): Promise<Itable[] | number> {
    const tables = await Tables.findAll({
      where: { available: true },
    });
    if (!tables) return statusCode.NOT_FOUND;
    return tables;
  }

  async registerTables(table: Itable): Promise<void> {
    await Tables.create(table);
    return;
  }

  async occupyTable(id: number): Promise<string> {
    await Tables.update({ available: false }, { where: { id } })
    return 'Table occupied!'
  }
}

export default TableService