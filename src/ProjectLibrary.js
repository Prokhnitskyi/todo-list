import { Project } from './components/Project/Project';
import { TodoItem } from './components/TodoItem/TodoItem';

export class ProjectLibrary {
  idCounter = this.#loadLibrary().idCounter || 0;
  projects = this.#loadLibrary().projects || {};

  addDefaultProject () {
    const id = this.idCounter;
    const project = new Project(
      {
        id: this.idCounter,
        name: 'Default project',
        selected: true,
      });
    const item = new TodoItem({
      title: 'Click this title to expand',
      description: 'This is a description',
      priority: 'High',
      URL: 'https://google.com',
      tags: ['tag_example'],
      flag: true
    });
    item.dueDate ='2025-12-31';
    this.projects[this.idCounter] = { id, project, items: [item] };
    this.idCounter++;
  }

  addProject (project) {
    project.id = this.idCounter;
    this.projects[this.idCounter] = { id: this.idCounter, project, items: [] };
    this.idCounter++;
    this.#saveLibrary();
  }

  removeProject (projectId) {
    delete this.projects[projectId];
    this.#saveLibrary();
  }

  selectProject(projectId) {
    for (const projectsKey in this.projects) {
      this.projects[projectsKey].project.selected = false;
    }
    this.projects[projectId].project.selected = true;
    this.#saveLibrary();
  }

  getSelectedProject() {
    for (const projectsKey in this.projects) {
      if (this.projects[projectsKey].project.selected) {
        return projectsKey;
        break;
      }
    }
  }

  getProjectsArray () {
    const array = [];
    for (const projectKey in this.projects) {
      array.push(this.projects[projectKey].project);
    }
    return array;
  }

  addTodoItem (projectId, todoItem) {
    if (this.projects.hasOwnProperty(projectId)) {
      this.projects[projectId].items.unshift(todoItem);
    }
    this.#saveLibrary();
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
    this.#saveLibrary();
  }

  editTodoItem (uuid, replacementItem) {
    for (const projectsKey in this.projects) {
      this.projects[projectsKey].items.forEach((item, index, array) => {
        if (item.uuid === uuid) {
          replacementItem.uuid = item.uuid;
          array[index] = replacementItem;
        }
      });
    }
    this.#saveLibrary();
  }

  flagTodoItem (uuid) {
    this.getTodoItem(uuid).switchFlag();
    this.#saveLibrary();
  }

  completeTodoItem (uuid) {
    this.getTodoItem(uuid).switchCompletion();
    this.#saveLibrary();
  }

  getTodoItem(uuid) {
    let todo;
    for (const projectsKey in this.projects) {
      this.projects[projectsKey].items.forEach((item) => {
        if (item.uuid === uuid) {
          todo = item
        }
      });
    }
    return todo;
  }

  editProject(projectId, {name, color}) {
    this.projects[projectId].project.name = name;
    this.projects[projectId].project.color = color;
    this.#saveLibrary();
  }

  #saveLibrary() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
    localStorage.setItem('idCounter', this.idCounter.toString());
  }

  #loadLibrary () {
    const projects = JSON.parse(localStorage.getItem('projects'));
    const idCounter = parseInt(localStorage.getItem('idCounter'));

    for (const projectsKey in projects) {
      Object.setPrototypeOf(projects[projectsKey].project, Project.prototype);
      projects[projectsKey].items = projects[projectsKey].items.map((plainItem) => {
        const item = new TodoItem(plainItem);
        item.dueDate = plainItem.savedDueDate;
        return item;
      });
    }

    return { projects, idCounter };
  }

}