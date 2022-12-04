import { Injectable } from '@nestjs/common';
import TableModel from "../models/table.model";

@Injectable()
export class TableService {
  private tables: TableModel[] = []

  authTable(clientId: string, clientSecret: string) {
    return this.tables.find(t => t.id === clientId && t.clientSecret === clientSecret)
  }


}
