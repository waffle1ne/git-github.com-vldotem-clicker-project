function click_action(item) {
    console.log('click');
    //click active-item and make an action
    if (item.status === 'done') return;
    // item.style.backgroundColor = '#55c691d2';
    item.status = changeStage(item);
}

function swipe_action(item) {
    console.log('swipe');
    //swipe and refresh, or change active-item
    if (!item.status || item.status === 'undone') return;
    // item.style.backgroundColor = '#c65555d2';
    item.status = changeStage(item);;
}

function changeStage(item) {
    let stages = getStages(item);
    if (stages === undefined) return;

    for (i in stages) {
        if (
            !stages[i].style['visibility'] ||
            stages[i].style['visibility'] === 'visible'
        ) {
            cut(stages[i]);
            return i == stages.length - 1 ? 'done' : 'undone';
        }
    }
    restore(stages);
    return 'undone';
}

function cut(part) {
    part.classList.add('shake');
    setTimeout(() => {
        part.classList.remove('shake');
        part.style['visibility'] = 'hidden'
    }, 100);
}

function restore(stages) {
    stages.forEach((stage) => {
        stage.style['visibility'] = 'visible';
    });
}

function getStages(item) {
    for (let i = 0; i < item.children.length; i++) {
        if (item.children[i].className === 'stages') {
            return Array.from(item.children[i].children);
        }
    }
}

function new_active_item() {}

function remove_active_item() {}

active_item = document.getElementById('action-item');
document.addEventListener('click', (event) => {
    if (event.target === document.getElementById('theme-btn')) return;
    click_action(active_item);
});
document.addEventListener('wheel', (event) => {
    if (event.wheelDeltaY > 0) swipe_action(active_item);
});

//touch
yStart = null;
document.addEventListener('touchstart', (event) => {
    yStart = event.touches[0].clientY;
});
yEnd = null;
document.addEventListener('touchmove', (event) => {
    yEnd = event.touches[0].clientY;
});
document.addEventListener('touchend', (event) => {
    if (yStart && yEnd && yStart - yEnd > 0) {
        swipe_action(active_item);
    }
    yStart = null;
    yEnd = null;
});
