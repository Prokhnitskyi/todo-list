import { Project } from './components/Project/Project';
import { TodoItem } from './components/TodoItem/TodoItem';

export class ProjectLibrary {
  idCounter = 0;
  projects = {};

  addDefaultProject () {
    const id = this.idCounter;
    const project = new Project(
      { id: this.idCounter, name: 'Default project', color: 'black', selected: true });
    const item = new TodoItem({ title: 'My new item', tags: ['my_tag'], flag: true });
    this.projects[this.idCounter] = { id, project, items: [item] };
    this.idCounter++;
  }

  addProject (project) {
    project.id = this.idCounter;
    this.projects[this.idCounter] = { id: this.idCounter, project, items: [] };
    this.idCounter++;
  }

  removeProject (projectId) {
    delete this.projects[projectId];
  }

  addTodoItem (projectId, todoItem) {
    if (this.projects.hasOwnProperty(projectId)) {
      this.projects[projectId].items.unshift(todoItem);
    }
  }

  removeTodoItem (uuid) {
    for (const projectsKey in this.projects) {
      this.projects[projectsKey].items.forEach((item, index, array) => {
        if (item.uuid === uuid) {
          const index = array.indexOf(item);
          array.splice(index, 1);
        }
      });
    }
  }

  selectProject(projectId) {
    for (const projectsKey in this.projects) {
      this.projects[projectsKey].project.selected = false;
    }
    this.projects[projectId].project.selected = true;
  }

  getSelectedProject() {
    for (const projectsKey in this.projects) {
      if (this.projects[projectsKey].project.selected) {
        return projectsKey;
        break;
      }
    }
  }

  editProject(projectId, {name, color}) {
    this.projects[projectId].project.name = name;
    this.projects[projectId].project.color = color;
  }

}