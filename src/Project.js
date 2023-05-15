import { TodoItem } from './todoItem';
import defaultIcon from './assets/project-icons/default.svg';

export class Project {
  items = [];
  constructor ({name, icon = defaultIcon, color = '#002aff', description = ''}) {
    this.name = name;
    this.icon = icon;
    this.color = color;
    this.description = description;
  }

  addItem(todoItem) {
    if (todoItem instanceof TodoItem) {
      this.items.unshift(todoItem);
    }
  }
}