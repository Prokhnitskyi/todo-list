import './project-modal.scss';

export class Project {
  constructor ({id, name, color = '#395B64', selected = false}) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.selected = selected;
  }
}