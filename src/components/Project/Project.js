import './project-modal.scss';

export class Project {
  constructor ({id, name, color = '#2C3333', selected = false}) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.selected = selected;
  }
}