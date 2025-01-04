import { getStages } from './shared.js';

export function swipe_action(current, next) {
    console.log('swipe');
    //swipe and refresh, or change active-item
    if (!current.status || current.status === 'undone') return;
    next.status = 'undone';
    remove(current);
    add(next);
}

function remove(item) {
    hideAll(item);
}

function hideAll(item) {
    item.style['visibility'] = 'hidden';
    getStages(item).forEach((stage) => {
        stage.style['visibility'] = 'hidden';
    });
}

function add(item) {
    showAll(item);
    item.classList.add('rightSlide');
    setTimeout(() => {
        item.classList.remove('rightSlide');
    }, 100);
}

function showAll(item) {
    item.style['visibility'] = 'visible';
    getStages(item).forEach((stage) => {
        stage.style['visibility'] = 'visible';
    });
}