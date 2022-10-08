'use strict';

const getStorage = () => JSON.parse(localStorage.getItem('dataArr')) || [];

const setStorage = (task) => {
    localStorage.setItem('dataArr', JSON.stringify(task));
};

const addTaskData = (task) => {
    const dataArr = getStorage('dataArr');
    dataArr.push(task);
    setStorage(dataArr);
    console.log('dataArr: ', dataArr);
};

const removeStorage = (id) => {
    const dataArr = getStorage('dataArr');
    const newArr = dataArr.filter(item => item.id !== id);
    newArr.forEach((item, index) => {
        item.id = index + 1;
    });
    setStorage(newArr);
    console.log('newArr: ', newArr);
    getStorage();
};

const createTitle = () => {
    const h3 = document.createElement('h3');
    h3.classList.add('title');
    h3.textContent = 'Todo App';

    return h3;
};

const createButtonsGroup = params => {
    const btns = params.map(({className, type, text}) => {
        const button = document.createElement('button');
        button.className = className;
        button.type = type;
        button.textContent = text;

        return button;
    });

    return btns;
};

const createForm = () => {
    const form = document.createElement('form');
    form.classList.add('form', 'd-flex', 'align-items-center', 'mb-3');

    form.insertAdjacentHTML('beforeend', `
            <label class="form-group me-3 mb-0">
                <input type="text" id="input"
                class="form-control" placeholder="ввести задачу">
            </label>
    `);

    return form;
};

const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-hover', 'table-bordered');

    const thead = document.createElement('thead');

    thead.insertAdjacentHTML('beforeend', `
        <tr>
            <th>№</th>
            <th>Задача</th>
            <th>Статус</th>
            <th>Действия</th>
        </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
};


const renderTodoApp = (container) => {
    container.classList.add('vh-100', 'w-100', 'd-flex',
            'align-items-center', 'justify-content-center', 'flex-column');

    const title = createTitle();
    const form = createForm();
    const buttonGroup = createButtonsGroup([
        {
            className: 'btn btn-primary me-3',
            type: 'submit',
            text: 'Сохранить',
        },
        {
            className: 'btn btn-warning',
            type: 'reset',
            text: 'Очистить',
        },
    ]);

    buttonGroup[0].disabled = true;

    form.append(...buttonGroup);

    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('table-wrapper');

    const table = createTable();
    tableWrapper.append(table);

    container.append(title, form, tableWrapper);

    return {
        form,
        btnAdd: buttonGroup[0],
        btnReset: buttonGroup[1],
        list: table.tbody,
    };
};

const createRow = ({id, task}) => {
    const tr = document.createElement('tr');
    tr.classList.add('table-light', 'table-row');
    tr.id = id;
    const tdNum = document.createElement('td');
    tdNum.classList.add('task-num');
    tdNum.textContent = id;

    const tdTask = document.createElement('td');
    tdTask.classList.add('task', 'table-task');
    tdTask.textContent = task;

    const tdStatus = document.createElement('td');
    tdStatus.classList.add('task-status');
    tdStatus.textContent = 'В процессе';

    const tdActions = document.createElement('td');
    tdActions.classList.add('task-actions');

    const btnsActions = createButtonsGroup([
        {
            className: 'btn btn-danger me-3',
            type: 'button',
            text: 'Удалить',
        },
        {
            className: 'btn btn-success',
            type: 'button',
            text: 'Завершить',
        },
    ]);

    tdActions.append(...btnsActions);

    tr.append(tdNum, tdTask, tdStatus, tdActions);

    return tr;
};

const renderTasks = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
};

// const addTaskData = (task, data) => {
//     data.push(task);
// };

const addTaskPage = (task, list) => {
    list.append(createRow(task));
};

const inputControl = (btnAdd, btnReset) => {
    const input = document.querySelector('#input');
    input.addEventListener('input', () => {
        input.value !== '' ? btnAdd.disabled = false : btnAdd.disabled = true;
    });

    btnReset.addEventListener('click', () => {
        btnAdd.disabled = true;
    });
};

// const createId = () => {
//     const random = (min, max) =>
//         Math.floor(Math.random() * (max - min + 1)) + min;
//     const randomId = random(1, 30);
//     return randomId;
// };

const formControl = (form, list, data, btnAdd, btnReset) => {
    inputControl(btnAdd, btnReset);

    form.addEventListener('submit', e => {
        const data = getStorage();
        e.preventDefault();

        const newTask = {
            id: data.length + 1,
            task: form.input.value,
        };
        console.log(data);
        addTaskPage(newTask, list);
        addTaskData(newTask);

        form.reset();
        btnAdd.disabled = true;
    });
};

const taskFinish = (list) => {
    list.addEventListener('click', e => {
        const target = e.target;
        const tableTask = target.closest('tr').querySelector('.table-task');
        if (target.closest('.btn-success')) {
            const tableRow = target.closest('.table-row');
            tableRow.classList.remove('table-light');
            tableRow.classList.add('table-success');
            tableTask.classList.remove('task');
            tableTask.classList.add('text-decoration-line-through');
        }
    });
};

const taskDelete = (list) => {
    list.addEventListener('click', e => {
        const target = e.target;
        const dataId = target.closest('.table-row').id;
        console.log('dataId: ', dataId);
        if (target.closest('.btn-danger')) {
            target.closest('.table-row').remove();

            removeStorage(+dataId);

            const rows = document.querySelectorAll('.table-row');
            rows.forEach((item, index) => {
                item.id = index + 1;
            });
            const nums = document.querySelectorAll('.task-num');
            nums.forEach((item, index) => {
                item.textContent = index + 1;
            });
        }
    });
};


const container = document.querySelector('.app-container');

const init = () => {
    const data = getStorage();
    const todoApp = renderTodoApp(container);

    const {
        form,
        btnAdd,
        btnReset,
        list,
    } = todoApp;

    renderTasks(list, data);

    formControl(form, list, data, btnAdd, btnReset);

    taskFinish(list);
    taskDelete(list);
};
init();

