import { ProjectLibrary } from './ProjectLibrary';
import { NavigationView } from './components/NavigationView/Navigation';
import { TodoItem } from './components/TodoItem/TodoItem';

export class UserInterfaceController {
  library = new ProjectLibrary();
  navigation = new NavigationView();
  constructor () {

  }

  initNav() {
    this.library.addDefaultProject();
    const projects = this.library.projects;
    // temp start
    this.library.addTodoItem('0', new TodoItem({ title: 'My new test', tags : ['test1', 'test2'] }));
    this.library.addTodoItem('0', new TodoItem({ title: 'My new test', tags : ['test3'] }));
    console.log(projects);
    // temp end
    const projectsNamesArray = getProjectsNamesWithStatus(projects);
    this.navigation.renderProjectsList(projectsNamesArray);
    const tags = getAllTags (projects);
    this.navigation.renderTags(tags);
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

function getProjectsNamesWithStatus (projects) {
  const array = [];
  for (const projectKey in projects) {
    array.push({
      name: projects[projectKey].project.name,
      selected: projects[projectKey].project.selected
    });
  }
  return array;
}