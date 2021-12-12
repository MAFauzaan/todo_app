const months: string[] = ["January", "February", "March","April", "May", "Juny", "July", "Augustus", "September", "October", "November", "December"];
let currentDatetime = new Date()
export const formattedDate = currentDatetime.getDate() + "-" + months[currentDatetime.getMonth()] + "-" + currentDatetime.getFullYear()
