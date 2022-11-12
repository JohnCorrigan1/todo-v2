export class TodoItem {
  title: string;
  description: string;
  date: string;
  uid: string;
  todoId: string;

  constructor(title: string, desription: string, date: string, uid: string, todoId: string){
    this.title = title,
    this.description = desription,
    this.date = date,
    this.uid = uid,
    this.todoId = todoId
  }
}