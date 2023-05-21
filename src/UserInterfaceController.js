import { ProjectLibrary } from './ProjectLibrary';
import { NavigationView } from './components/NavigationView/Navigation';
import { TodoItem } from './components/TodoItem/TodoItem';
import { Project } from './components/Project/Project';

export class UserInterfaceController {
  library = new ProjectLibrary();
  navigation = new NavigationView();

  projectList = document.querySelector('.projects__list');
  addProjectItemBtn = document.querySelector('.controls__add-project');
  addTodoItemBtn = document.querySelector('.controls__add-item');
  completedFilter = document.querySelector('#completed');
  flaggedFilter = document.querySelector('#flagged');
  projectModal = document.querySelector('#project-modal');
  projectModalForm = this.projectModal.querySelector('form');
  projectNameInput = this.projectModalForm.querySelector('#set-project-name');
  projectColorInput = this.projectModalForm.querySelector('#set-project-color');

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

  initNavHandlers () {

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

      this.projectModalForm.dataset.projectId = data.projectId;
      this.projectNameInput.value = data.projectName;
      this.projectColorInput.value = data.projectColor;
      this.projectModal.showModal();
    };

    const showAddProject = () => {
      this.projectModalForm.dataset.projectId = '';
      this.projectModalForm.reset();
      this.projectModal.showModal();
    };

    const handleProjectModal = (event) => {
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

      this.navigation.renderProjectsList(getAllProjects(this.library.projects));
      //TODO: Render selected project items
    };

    this.projectList.addEventListener('click', selectProject);
    this.projectList.addEventListener('click', showEditProject);
    this.projectModalForm.addEventListener('submit', handleProjectModal);
    this.addProjectItemBtn.addEventListener('click', showAddProject);

    const closeButtons = document.querySelectorAll('dialog [type="reset"]');
    closeButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        this.closest('dialog').close();
      });
    });

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

function getAllProjects (projects) {
  const array = [];
  for (const projectKey in projects) {
    array.push(projects[projectKey].project);
  }
  return array;
}