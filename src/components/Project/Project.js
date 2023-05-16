import defaultIcon from '../../assets/project-icons/default.svg';

export class Project {
  constructor ({id, name, icon = defaultIcon, color = '#002aff', description = ''}) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.color = color;
    this.description = description;
  }
}