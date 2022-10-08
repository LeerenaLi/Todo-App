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

export const taskFinish = (list) => {
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
            tableTask.setAttribute('contenteditable', true);
        }
    });
};


