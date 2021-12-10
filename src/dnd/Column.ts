import { v4 as uuid } from 'uuid';
import { DefaultItems } from './DefaultItems';
import { ColumnModel } from '../model/Model';

export const Column: ColumnModel = {
    [uuid()]: {
        name: "To do",
        items: DefaultItems
      },
      [uuid()]: {
        name: "Doing",
        items: []
      },
      [uuid()]: {
        name: "Finished",
        items: []
      }
}
