import { getStages } from './shared.js';

export function click_action(item) {
    console.log('click');
    //click active-item and make an action
    if (item.status === 'done') return;
    item.status = changeStage(item);
}

function changeStage(item) {
    let stages = getStages(item);
    if (stages === undefined) return;

    let i = 0;
    for (; i < stages.length; i++) {
        if (
            !stages[i].style['visibility'] ||
            stages[i].style['visibility'] === 'visible'
        ) {
            cut(stages[i]);
            return i == stages.length - 1 ? 'done' : 'undone';
        }
    }
    return 'done';
}

function cut(part) {
    part.classList.add('shake');
    setTimeout(() => {
        part.classList.remove('shake');
        part.style['visibility'] = 'hidden';
    }, 100);
}
