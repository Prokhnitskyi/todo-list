import './navigation.scss';

export class NavigationView {
  nav = document.querySelector('.navigation');
  projectList = document.querySelector('.projects__list');
  addProjectItemBtn = document.querySelector('.controls__add-project');
  addTodoItemBtn = document.querySelector('.controls__add-item');
  tags = document.querySelector('.filters__tags');
  filtersTagContainer = document.querySelector('.filters__tags-container');
  completedFilter = document.querySelector('#completed');
  flaggedFilter = document.querySelector('#flagged');
  constructor () {
  }

  renderProjectsList(projectsNamesArray) {
    this.projectList.innerHTML = projectsNamesArray.map((project) => (
      `<li class="projects__item">
            <button type="button"
             class="projects__select ${project.selected
        ? 'projects__select--active'
        : ''}">
                ${project.name}
             </button>
            <button type="button" class="projects__edit">
                edit
            </button>
        </li>`
    )).join('');
  }

  renderTags(tagsList) {
    if (tagsList.length === 0) {
      this.tags.style.display = 'none';
    } else {
      this.tags.style.display = 'block';
    }

    this.filtersTagContainer.innerHTML = tagsList.map((tag) => (
      `<span class="filters__tag">${tag}</span>`
    )).join('');
  }
}