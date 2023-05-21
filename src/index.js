import './styles/style.scss';

import { UserInterfaceController } from './UserInterfaceController';

const userInterface = new UserInterfaceController();
userInterface.initNavView();
userInterface.initNavProjectHandlers();
userInterface.initNavTodoHandlers();
userInterface.initModalHandlers();

