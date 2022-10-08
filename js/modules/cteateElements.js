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
    tdTask.setAttribute('contenteditable', false);

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
            className: 'btn btn-success me-3',
            type: 'button',
            text: 'Завершить',
        },
        {
            className: 'btn btn-secondary',
            type: 'button',
            text: 'Редактировать',
        },
    ]);

    tdActions.append(...btnsActions);

    tr.append(tdNum, tdTask, tdStatus, tdActions);

    return tr;
};

export default {
    createTitle,
    createButtonsGroup,
    createForm,
    createTable,
    createRow,
};
