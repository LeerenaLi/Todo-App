import {getStorage} from './modules/storage.js';
import {renderTodoApp, renderTasks} from './modules/render.js';
import {formControl, taskFinish, taskDelete, taskRedact}
    from './modules/control.js';


const container = document.querySelector('.app-container');


export const init = (username) => {
    console.log(username);
    const data = getStorage(username);

    const todoApp = renderTodoApp(container);

    const {
        form,
        btnAdd,
        btnReset,
        list,
    } = todoApp;

    renderTasks(list, data);

    formControl(form, list, data, btnAdd, btnReset, username);

    taskFinish(list, username);
    taskDelete(list, username);
    taskRedact(list);
};
// init();
