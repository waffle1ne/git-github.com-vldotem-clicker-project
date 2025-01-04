export function getStages(item) {
    for (let i = 0; i < item.children.length; i++) {
        if (item.children[i].className === 'stages') {
            return Array.from(item.children[i].children);
        }
    }
}