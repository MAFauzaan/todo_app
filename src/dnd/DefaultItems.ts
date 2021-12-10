import { v4 as uuid } from 'uuid';
import { DefaultItemsModel } from '../model/Model'

const months = ["January", "February", "March","April", "May", "Juny", "July", "Augustus", "September", "October", "November", "December"];
let currentDatetime = new Date()
let formattedDate = currentDatetime.getDate() + "-" + months[currentDatetime.getMonth()] + "-" + currentDatetime.getFullYear()


export const DefaultItems: DefaultItemsModel[] = [
    {
      id: uuid(),
      title: 'Clean my room',
      description: 'I think it is time to clean up my room after my friends were having sleepover in my house last night',
      date: formattedDate
    },
    {
      id: uuid(),
      title: 'Make dinner for family',
      description: 'Mom asked me to make dinner because she and dad are going to come home late.',
      date: formattedDate
    },
    {
      id: uuid(),
      title: 'Do your homeworks!',
      description: 'I should finish all piled up homework from last week. Otherwise, teachers gonna be so mad.',
      date: formattedDate
    }
  ]
