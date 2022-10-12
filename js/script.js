import {getStorage} from './modules/storage.js';
import {renderTodoApp, renderTasks} from './modules/render.js';
import {formControl, taskFinish, taskDelete, taskRedact}
    from './modules/control.js';


const container = document.querySelector('.app-container');
// const inputName = document.querySelector('#recipient-name');
// export const username = inputName.value;
// console.log('username: ', username);
export const init = (username) => {
    const data = getStorage(username);

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
