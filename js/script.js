import {getStorage} from './modules/storage.js';
import {renderTodoApp, renderTasks} from './modules/render.js';
import {formControl, taskFinish, taskDelete, taskRedact}
    from './modules/control.js';


const container = document.querySelector('.app-container');

export const init = () => {
    const data = getStorage();

    const todoApp = renderTodoApp(container);

    const {
        form,
        btnAdd,
        btnReset,
        list,
    } = todoApp;

    renderTasks(list, data);
    // selectControl();
    formControl(form, list, data, btnAdd, btnReset);

    taskFinish(list);
    taskDelete(list);
    taskRedact(list);
};
// init();
