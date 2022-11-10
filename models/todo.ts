// export type TodoItem = {
//   title: string;
//   description: string;
//   date: string;
//   uid: string | undefined;
// } | null;

export class TodoItem {
  title: string;
  description: string;
  date: string;
  uid: string;

  constructor(title: string, desription: string, date: string, uid: string){
    this.title = title,
    this.description = desription,
    this.date = date,
    this.uid = uid
  }
} 