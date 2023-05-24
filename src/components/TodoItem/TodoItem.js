import './todo-item.scss';
import { uuidv4 } from '../../utility';

export class TodoItem {
  #dueDate;
  savedDueDate; // for localStorage
  constructor ({
    title,
    description,
    URL,
    priority = 'Medium',
    flag = false,
    completed = false,
    tags = [],
  }) {
    if (title.length === 0) {
      throw new Error('Title can\'t be empty');
    }
    this.uuid = uuidv4();
    this.title = title;
    this.description = description;
    this.URL = URL;
    this.priority = priority;
    this.flag = flag;
    this.completed = completed;
    this.tags = tags;
  }

  addTag (tag) {
    if (!this.tags.includes(tag) && tag.length !== 0) {
      this.tags.push(tag);
    }
  }

  removeTag (tag) {
    const array = this.tags;
    if (array.includes(tag)) {
      const index = array.indexOf(tag);
      array.splice(index, 1);
    }
  }

  switchCompletion() {
    this.completed = !this.completed;
  }

  switchFlag() {
    this.flag = !this.flag;
  }

  set dueDate(dateString) {
    if (dateString.search(/\d{4}-\d{2}-\d{2}/i) !== -1) {
      this.#dueDate = new Date(dateString);
      this.savedDueDate = new Date(dateString);
    } else {
      throw new Error('Invalid date format, should be yyyy-mm-dd');
    }
  }
  get dueDate() {
    return this.#dueDate?.toISOString().split('T')[0];
  }
}