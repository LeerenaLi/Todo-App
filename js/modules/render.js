import elements from './cteateElements.js';

const {
    createTitle,
    createSelect,
    createButtonsGroup,
    createForm,
    createTable,
    createRow,
} = elements;

export const renderTodoApp = (container) => {
    container.classList.add('vh-100', 'w-100', 'd-flex',
            'align-items-center', 'justify-content-center', 'flex-column');

    const title = createTitle();
    const form = createForm();
    const select = createSelect();
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

    form.append(select, ...buttonGroup);

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


export const renderTasks = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
};
