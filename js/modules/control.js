import elements from './cteateElements.js';
import {username, setStorage, getStorage, removeStorage} from './storage.js';

const {
    createRow,
} = elements;


export const addTaskPage = (task, list) => {
    list.append(createRow(task));
};

export const addTaskData = (task) => {
    const dataArr = getStorage(`${username}`);
    dataArr.push(task);
    setStorage(dataArr);
    console.log('dataArr: ', dataArr);
};

export const inputControl = (btnAdd, btnReset) => {
    const input = document.querySelector('#input');
    input.addEventListener('input', () => {
        input.value !== '' ? btnAdd.disabled = false : btnAdd.disabled = true;
    });

    btnReset.addEventListener('click', () => {
        btnAdd.disabled = true;
    });
};


export const formControl = (form, list, data, btnAdd, btnReset) => {
    inputControl(btnAdd, btnReset);
    const select = form.querySelector('#select');
    console.log('select: ', select);

    form.addEventListener('submit', e => {
        const data = getStorage();
        e.preventDefault();

        const newTask = {
            id: data.length + 1,
            task: form.input.value,
            priority: select.value,
            status: 'в процессе',
        };
        console.log(data);
        addTaskPage(newTask, list);
        addTaskData(newTask);

        form.reset();
        btnAdd.disabled = true;
    });
};

export const taskFinish = (list) => {
    const data = getStorage(`${username}`);
    console.log('data: ', data);

    list.addEventListener('click', e => {
        const target = e.target;
        const tableTask = target.closest('tr').querySelector('.table-task');
        const tableRow = target.closest('tr');
        const status = target.closest('tr').querySelector('.task-status');
        const className = tableRow.classList[1];
        const index = tableRow.id - 1;

        if (target.closest('.btn-success')) {
            tableTask.classList.toggle('text-decoration-line-through');
            if (tableTask.classList.contains('text-decoration-line-through')) {
                tableRow.classList.remove(className);
                status.textContent = 'Завершено';
                tableRow.classList.add('table-success');
            } else {
                status.textContent = 'В процессе';
                tableRow.classList.remove('table-success');
                tableRow.classList.add(data[index].priority);
            }
            data.forEach((item) => {
                if (item.id === index) {
                    console.log(item.status);
                    item.status = status.textContent;
                }
            });

            const newData = data;
            setStorage(newData);
        }
    });
};

export const taskDelete = (list) => {
    list.addEventListener('click', e => {
        const target = e.target;
        const dataId = target.closest('.table-row').id;
        console.log('dataId: ', dataId);
        if (target.closest('.btn-danger')) {
            const queston = confirm('Точно удалить?');
            if (queston === true) {
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
            } else {
                return;
            }
        }
    });
};

export const taskRedact = (list) => {
    list.addEventListener('click', e => {
        const target = e.target;
        const tableTask = target.closest('tr').querySelector('.table-task');
        if (target.closest('.btn-secondary')) {
            tableTask.classList.toggle('redact');
            if (tableTask.classList.contains('redact')) {
                tableTask.setAttribute('contenteditable', true);
                tableTask.addEventListener('keydown', e => {
                    if (e.keyCode === 13) {
                        tableTask.setAttribute('contenteditable', false);
                    }
                });
            } else {
                tableTask.setAttribute('contenteditable', false);
            }
        }
    });
};


