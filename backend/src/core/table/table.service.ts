import { Injectable } from '@nestjs/common';
import TableModel from "../models/table.model";

@Injectable()
export class TableService {
  private tables: TableModel[] = [
    { id: "00bb39f2-eb16-45cf-ad7e-1c7c37b1ed2f", name: 'Main'}
  ]

  exists(id: string) {
    return !!this.tables.find(t => t.id === id)
  }

  get(clientId: string) {
    return this.tables.find(t => t.id === clientId)
  }


}
