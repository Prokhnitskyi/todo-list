import './navigation.scss';

export class NavigationView {
  projectList = document.querySelector('.projects__list');
  tags = document.querySelector('.filters__tags');
  filtersTagContainer = document.querySelector('.filters__tags-container');

  renderProjectsList(projectsNamesArray) {
    this.projectList.innerHTML = projectsNamesArray.map((project) => (
      `<li class="projects__item">
            <button type="button"
             class="projects__select 
             ${project.selected ? 'projects__select--active' : ''}" 
             data-project-id="${project.id}"
             style="color: ${project.color}">
                ${project.name}
             </button>
            <button type="button" class="projects__edit"
             data-project-id="${project.id}"
             data-project-name="${project.name}"
             data-project-color="${project.color}">
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