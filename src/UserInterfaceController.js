import { ProjectLibrary } from './ProjectLibrary';
import { NavigationView } from './components/NavigationView/Navigation';
import { TodoItem } from './components/TodoItem/TodoItem';
import { Project } from './components/Project/Project';

export class UserInterfaceController {
  library = new ProjectLibrary();
  navigation = new NavigationView();
  tagFilterValue;

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
  todoTemplate = document.querySelector('#todo-template');
  todosContainer = document.querySelector('.todos');
  filtersTagContainer = document.querySelector('.filters__tags-container');
  navBtn = document.querySelector('.navigation__menu');
  headerNavBtn = document.querySelector('.header__menu');
  mainContainer = document.querySelector('.container');
  nav = document.querySelector('.navigation');
  contentContainer = document.querySelector('.content');

  initNavView () {
    this.library.addDefaultProject();
    const projects = this.library.projects;
    this.navigation.renderProjectsList(getAllProjects(projects));
    this.updateTags();
  }

  initHamburgerMenuHandlers() {
    const switchNavOnMedia = (mediaQuery) => {
      if (mediaQuery.matches) {
        this.mainContainer.classList.add('container--menu-hidden');
        this.nav.classList.add('navigation--hidden');
      } else {
        this.mainContainer.classList.remove('container--menu-hidden');
        this.nav.classList.remove('navigation--hidden');
      }
    }

    const switchNavigation = () => {
      this.mainContainer.classList.toggle('container--menu-hidden');
      this.nav.classList.toggle('navigation--hidden');
    }

    const hideMenu = (event) => {
      if (mediaQuery.matches) {
        this.mainContainer.classList.add('container--menu-hidden');
        this.nav.classList.add('navigation--hidden');
      }
    }

    const mediaQuery = window.matchMedia('(max-width: 700px)');
    switchNavOnMedia(mediaQuery);
    mediaQuery.addEventListener('change', switchNavOnMedia);
    this.navBtn.addEventListener('click', switchNavigation);
    this.headerNavBtn.addEventListener('click', switchNavigation);
    this.contentContainer.addEventListener('click', hideMenu);
  }

  renderTodoItems () {
    this.todosContainer.innerHTML = '';
    const selectedId = this.library.getSelectedProject();
    const items = this.#filterTodos(this.library.projects[selectedId].items);

    const color = this.library.projects[selectedId].project.color;
    items.forEach(item => {
      const todo = buildTodoElement({
        item,
        blueprint: this.todoTemplate.content,
        color
      });
      this.todosContainer.append(todo);
    });
    this.updateTags();
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

      this.updateTags();
      this.renderTodoItems();
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

  initTodoHandlers () {
    const showAddTodoModal = () => {
      this.todoModalForm.dataset.uuid = '';
      this.todoModalForm.reset();
      this.todoModal.showModal();
    };

    const showTodoDetails = (event) => {
      if (!event.target.classList.contains('todo__title')) return;
      event.target.classList.toggle('todo__title--active');
      event.target.closest('.todo').
        querySelector('.todo__details').
        classList.
        toggle('todo__details--active');
    };

    const filterByTags = (event) => {
      const element = event.target;
      if (!element.classList.contains('filters__tag')) return;
      const tagText = element.textContent;
      if (element.classList.contains('filters__tag--selected')) {
        this.tagFilterValue = '';
      } else {
        this.tagFilterValue = tagText;
      }

      const tagElements = this.filtersTagContainer.querySelectorAll('.filters__tag');
      tagElements.forEach(tag => {
        if(!tag.isEqualNode(element)) {
          tag.classList.remove('filters__tag--selected');
        }
      });
      element.classList.toggle('filters__tag--selected');

      this.renderTodoItems();
    };

    const filterByCompleted = () => {
      this.renderTodoItems();
    }

    const filterByFlagged = () => {
      this.renderTodoItems();
    }

    const deleteTodoItem = (event) => {
      const elem = event.target;
      if (!elem.classList.contains('todo__delete')) return;
      const uuid = elem.closest('.todo').dataset.uuid;
      this.library.removeTodoItem(uuid);
      this.renderTodoItems();
    }

    const flagTodoItem = (event) => {
      const elem = event.target;
      if (!elem.classList.contains('todo__flag')) return;
      const todo = elem.closest('.todo');
      const uuid = todo.dataset.uuid;
      this.library.flagTodoItem(uuid);
      todo.querySelector('.todo__flag').classList.toggle('todo__flag--active');
    }

    const completeTodoItem = (event) => {
      const elem = event.target;
      if (!elem.classList.contains('todo__completed')) return;
      const todo = elem.closest('.todo');
      const uuid = todo.dataset.uuid;
      this.library.completeTodoItem(uuid);
      todo.querySelector('.todo__completed').classList.toggle('todo__completed--active');
    }

    const showEditTodoModal = (event) => {
      const elem = event.target;
      if (!elem.classList.contains('todo__edit')) return;
      const uuid = elem.closest('.todo').dataset.uuid;
      this.todoModalForm.dataset.uuid = uuid;
      const {
        title,
        description,
        URL,
        dueDate,
        priority,
        flag,
        tags,
      } = this.library.getTodoItem(uuid);
      const inputs = this.todoModalForm.elements;
      title && (inputs['set-title'].value = title);
      description && (inputs['set-description'].value = description);
      dueDate && (inputs['set-due-date'].value = dueDate.toISOString().split('T')[0]);
      URL && (inputs['set-url'].value = URL);
      priority && (inputs['set-priority'].value = priority);
      inputs['set-flagged'].checked = flag;
      inputs['set-tags'].value = tags.join(', ');
      this.todoModal.showModal();
    };

    this.addTodoItemBtn.addEventListener('click', showAddTodoModal);
    this.todosContainer.addEventListener('click', showTodoDetails);
    this.todosContainer.addEventListener('click', deleteTodoItem);
    this.todosContainer.addEventListener('click', flagTodoItem);
    this.todosContainer.addEventListener('click', completeTodoItem);
    this.todosContainer.addEventListener('click', showEditTodoModal);
    this.filtersTagContainer.addEventListener('click', filterByTags);
    this.completedFilter.addEventListener('change', filterByCompleted);
    this.flaggedFilter.addEventListener('change', filterByFlagged);
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
      this.renderTodoItems();
    };

    const handleTodoModal = () => {
      const uuid = this.todoModalForm.dataset.uuid;
      const inputs = this.todoModalForm.elements;
      const props = {
        title: inputs['set-title'].value,
        ...(inputs['set-description'].value &&
          { description: inputs['set-description'].value }),
        ...(inputs['set-url'].value && { URL: inputs['set-url'].value }),
        priority: inputs['set-priority'].value,
        flag: inputs['set-flagged'].checked,
      };
      const newItem = new TodoItem(props);
      if (inputs['set-due-date'].value) {
        newItem.setDueDate(inputs['set-due-date'].value);
      }
      const tags = parseTags(inputs['set-tags'].value);
      tags.forEach(tag => newItem.addTag(tag));
      const selectedId = this.library.getSelectedProject();
      if (!uuid) {
        this.library.addTodoItem(selectedId, newItem);
      } else {
        this.library.editTodoItem(uuid, newItem);
      }
      this.renderTodoItems();
      this.updateTags();
    };

    this.projectModalForm.addEventListener('submit', handleProjectModal);
    this.todoModalForm.addEventListener('submit', handleTodoModal);
  }

  updateTags() {
    const selectedId = this.library.getSelectedProject();
    const items = this.library.projects[selectedId].items;
    const tags = getAllTags(this.#filterTodos(items));
    this.navigation.renderTags(tags);
  }

  #filterTodos(todos) {
    const completed = this.completedFilter.checked;
    const flagged = this.flaggedFilter.checked;

    return todos.filter(item => {
      const hideCompleted = !completed && item.completed;
      const hideByTag = this.tagFilterValue && !item.tags.includes(this.tagFilterValue);
      if (hideCompleted || hideByTag) return false;
      if (flagged) return item.flag; // show only flagged if checked
      return true;
    });
  }

  init () {
    this.initNavView();
    this.initHamburgerMenuHandlers();
    this.initNavProjectHandlers();
    this.initTodoHandlers();
    this.initModalHandlers();
    this.renderTodoItems();
  }

}

function getAllTags (todos) {
  const array = [];
  for (const todo of todos) {
    array.push(...todo.tags);
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

function buildTodoElement({item, blueprint, color}) {
  const todo = blueprint.cloneNode(true);
  todo.querySelector('.todo').dataset.uuid = item.uuid;
  todo.querySelector(
    '.todo').style.border = `2px solid ${color}`;
  todo.querySelector('.todo__title').textContent = item.title;
  todo.querySelector('.todo__description').textContent = item.description;
  todo.querySelector('.todo__priority-value').textContent = item.priority;
  if (item.URL) {
    todo.querySelector('.todo__url a').textContent = item.URL;
    todo.querySelector('.todo__url a').href = item.URL;
  } else {
    todo.querySelector('.todo__url').remove();
  }
  if (item.dueDate) {
    const time = item.dueDate.toLocaleString('sv').split(' ')[0];
    todo.querySelector('.todo__due-date time').
      setAttribute('datetime', time);
    todo.querySelector('.todo__due-date time').textContent = time;
  } else {
    todo.querySelector('.todo__due-date').remove();
  }
  todo.querySelector('.todo__tags').innerHTML = item.tags.map(tag => (
    `<span class="todo__tag">${tag}</span>`
  )).join('');

  if (item.completed) {
    todo.querySelector('.todo__completed').classList.add('todo__completed--active');
  }
  if (item.flag) {
    todo.querySelector('.todo__flag').classList.add('todo__flag--active');
  }

  return todo;
}