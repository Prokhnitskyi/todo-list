import { Project } from './components/Project/Project';
import { TodoItem } from './components/TodoItem/TodoItem';

export class ProjectLibrary {
  idCounter = 0;
  projects = {};

  constructor () {

  }

  addDefaultProject () {
    const id = this.idCounter;
    const project = new Project(
      { id: this.idCounter, name: 'My new project', color: 'black' });
    const item = new TodoItem({ title: 'My new item' });
    this.projects[this.idCounter] = { id, project, items: [item] };
    this.idCounter++;
  }

  addProject (project) {
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

}