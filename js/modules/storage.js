import {findUsername, modalControl} from './control.js';
import {renderModal} from './render.js';

renderModal();

modalControl();

export const username = findUsername();
console.log('username: ', username);

// export const username = prompt('Введите Ваше имя');

export const setStorage = (task) => {
    localStorage.setItem(username, JSON.stringify(task));
};

export const getStorage = () =>
    JSON.parse(localStorage.getItem(`${username}`)) || [];

export const removeStorage = (id) => {
    const dataArr = getStorage(`${username}`);
    const newArr = dataArr.filter(item => item.id !== id);
    newArr.forEach((item, index) => {
        item.id = index + 1;
    });
    setStorage(newArr);
    getStorage();
};
