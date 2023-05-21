import { ProjectLibrary } from './ProjectLibrary';
import { NavigationView } from './components/NavigationView/Navigation';
import { TodoItem } from './components/TodoItem/TodoItem';
import { Project } from './components/Project/Project';
import * as events from 'events';

export class UserInterfaceController {
  library = new ProjectLibrary();
  navigation = new NavigationView();

  projectList = document.querySelector('.projects__list');
  addProjectItemBtn = document.querySelector('.controls__add-project');
  deleteProjectBtn = document.querySelector('.project-modal__delete');
  addTodoItemBtn = document.querySelector('.controls__add-item');
  completedFilter = document.querySelector('#completed');
  flaggedFilter = document.querySelector('#flagged');
  projectModal = document.querySelector('#project-modal');
  projectModalForm = this.projectModal.querySelector('form');
  projectNameInput = this.projectModalForm.querySelector('#set-project-name');
  projectColorInput = this.projectModalForm.querySelector('#set-project-color');
  todoModal = document.querySelector('#todo-modal');
  todoModalForm = this.todoModal.querySelector('.todo-modal__form');

  constructor () {

  }

  initNavView () {
    this.library.addDefaultProject();
    const projects = this.library.projects;
    // temp start
    this.library.addTodoItem('0',
      new TodoItem({ title: 'My new test', tags: ['test1', 'test2'] }));
    this.library.addTodoItem('0',
      new TodoItem({ title: 'My new test', tags: ['test3'] }));
    const testProject1 = new Project({ name: 'Project 1', color: '#b90a0a' });
    this.library.addProject(testProject1);
    const testProject2 = new Project({ name: 'Project 2', color: '#003bfc' });
    this.library.addProject(testProject2);
    this.library.addTodoItem('1',
      new TodoItem({ title: 'My new test', tags: ['test1', 'test2'] }));
    this.library.addTodoItem('2',
      new TodoItem({ title: 'My new test', tags: ['test3'] }));
    // temp end
    this.navigation.renderProjectsList(getAllProjects(projects));
    const tags = getAllTags(projects);
    this.navigation.renderTags(tags);
  }

  initNavProjectHandlers () {

    const selectProject = (event) => {
      const element = event.target;
      if (!element.classList.contains('projects__select')) return;
      if (element.classList.contains('projects__select--active')) return;
      const selectedId = element.dataset.projectId;
      this.library.selectProject(selectedId);
      document.querySelector('.projects__select--active').
        classList.
        toggle('projects__select--active');
      element.classList.toggle('projects__select--active');

      //TODO: Render selected project items
    };

    const showEditProject = (event) => {
      if (!event.target.classList.contains('projects__edit')) return;
      const data = event.target.dataset;
      this.deleteProjectBtn.style.display = 'block';
      this.projectModalForm.dataset.projectId = data.projectId;
      this.projectNameInput.value = data.projectName;
      this.projectColorInput.value = data.projectColor;
      this.projectModal.showModal();
    };

    const showAddProject = () => {
      this.deleteProjectBtn.style.display = 'none';
      this.projectModalForm.dataset.projectId = '';
      this.projectModalForm.reset();
      this.projectModal.showModal();
    };

    const deleteProject = () => {
      this.library.removeProject(this.projectModalForm.dataset.projectId);
      this.navigation.renderProjectsList(getAllProjects(this.library.projects));
      this.projectModal.close();
    };

    this.projectList.addEventListener('click', selectProject);
    this.projectList.addEventListener('click', showEditProject);
    this.addProjectItemBtn.addEventListener('click', showAddProject);
    this.deleteProjectBtn.addEventListener('click', deleteProject);

    const closeButtons = document.querySelectorAll('dialog [type="reset"]');
    closeButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        this.closest('dialog').close();
      });
    });

  }

  initNavTodoHandlers () {
    const showAddTodoModal = () => {
      this.todoModalForm.reset();
      this.todoModal.showModal();
    };
    this.addTodoItemBtn.addEventListener('click', showAddTodoModal);
  }

  initModalHandlers () {
    const handleProjectModal = () => {
      const projectId = this.projectModalForm.dataset.projectId;
      const props = {
        name: this.projectNameInput.value,
        color: this.projectColorInput.value,
      };

      if (projectId) { // create or edit project from same modal
        this.library.editProject(projectId, props);
      } else {
        const newProject = new Project(props);
        this.library.addProject(newProject);
        this.library.selectProject(this.library.idCounter - 1);
      }

      this.projectModalForm.reset();
      this.navigation.renderProjectsList(getAllProjects(this.library.projects));
      //TODO: Render selected project items
    };

    const handleTodoModal = (event) => {
      const inputs = this.todoModalForm.elements;
      const props = {
        title: inputs['set-title'].value,
        ...(inputs['set-description'].value && {description: inputs['set-description'].value}),
        ...(inputs['set-url'].value && {URL: inputs['set-url'].value}),
        priority: inputs['set-priority'].value,
        flag: inputs['set-flagged'].checked
      };
      const newItem = new TodoItem(props);
      if (inputs['set-due-date'].value) {
        newItem.setDueDate(inputs['set-due-date'].value);
      }
      const tags = parseTags(inputs['set-tags'].value);
      tags.forEach(tag => newItem.addTag(tag));
      const selectedId = this.library.getSelectedProject();
      this.library.addTodoItem(selectedId, newItem);
      //TODO: Render selected project items
    };

    this.projectModalForm.addEventListener('submit', handleProjectModal);
    this.todoModalForm.addEventListener('submit', handleTodoModal);
  }

}

function getAllTags (projects) {
  const array = [];
  for (const projectKey in projects) {
    const itemsTags = [];
    projects[projectKey].items.forEach((item) => {
      itemsTags.push(...item.tags);
    });
    array.push(...itemsTags);
  }
  return array;
}

function parseTags (tagsString) {
  const formattedSting = tagsString.replaceAll(/,+[ \t]*,*/g, ',');
  const array = formattedSting.split(',');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].trim();
  }
  return array;
}

function getAllProjects (projects) {
  const array = [];
  for (const projectKey in projects) {
    array.push(projects[projectKey].project);
  }
  return array;
}