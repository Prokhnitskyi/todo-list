export class TodoItem {
  constructor ({
    title = '',
    description = '',
    URL,
    dueDate = new Date(),
    priority = 0,
    flag = false,
    completed = false,
    tags = []
  }) {
    if (title.length === 0 && description.length === 0) {
      throw new Error('Title and description can\'t both be empty');
    }

    this.title = title;
    this.description = description;
    this.URL = URL
    this.dueDate = dueDate;
    this.priority = priority;
    this.flag = flag;
    this.completed = completed;
    this.tags = tags;
  }
}