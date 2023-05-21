import { ProjectLibrary } from './ProjectLibrary';
import { NavigationView } from './components/NavigationView/Navigation';
import { TodoItem } from './components/TodoItem/TodoItem';

export class UserInterfaceController {
  library = new ProjectLibrary();
  navigation = new NavigationView();
  constructor () {

  }

  init() {
    this.library.addDefaultProject();
    const projects = this.library.projects;
    const projectsNamesArray = getProjectsNamesWithStatus(projects);
    console.log(projects);
    console.log(projectsNamesArray);
    this.navigation.renderProjectsList(projectsNamesArray);
  }
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