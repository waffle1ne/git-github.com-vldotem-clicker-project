import { click_action } from './click.js';
import { swipe_action } from './swipe.js';

const items = document.getElementsByClassName('action-item');

function getCurrent() {
    if (items.length == 1) items[0];
    for (let i in items) {
        if (
            !items[i].style['visibility'] ||
            items[i].style['visibility'] === 'visible'
        ) {
            return items[i];
        }
    }
}

function getNext() {
    if (items.length == 1) items[0];
    for (let i in items) {
        if (items[i].style['visibility'] === 'hidden') {
            return items[i];
        }
    }
}

document.addEventListener('click', (event) => {
    if (event.target === document.getElementById('theme-btn')) return;
    click_action(getCurrent());
});

document.addEventListener('wheel', (event) => {
    if (event.wheelDeltaY > 0) swipe_action(getCurrent(), getNext());
});

//touch
let yStart = null;
document.addEventListener('touchstart', (event) => {
    yStart = event.touches[0].clientY;
});

let yEnd = null;
document.addEventListener('touchmove', (event) => {
    yEnd = event.touches[0].clientY;
});

document.addEventListener('touchend', (_event) => {
    if (yStart && yEnd && yStart - yEnd > 0) {
        swipe_action(getCurrent(), getNext());
    }
    yStart = null;
    yEnd = null;
});
//
