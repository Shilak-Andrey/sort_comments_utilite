const {
    findComments,
    deleteTodoFindImportant,
    makeArrayObjects,
    createTable,
    getTable
} = require('./show');

function sort(content, argument) {
    let regex = /\/\/ TODO.*/gi;
    let comments = findComments(content, regex);
    comments = [].concat(...comments);
    deleteTodoFindImportant(comments);
    makeArrayObjects(comments);
    switch (argument) {
        case 'importance':
            comments.sort(sortImports);
            break;
        case 'user':
            comments.sort(sortUsers);
            break;
        case 'date':
            comments.sort(sortDate);
            break;
        default:
            return console.log('wrong command');
    }
    const head = {
        important: '!',
        user: 'user',
        date: 'date',
        comment: 'comment',
        fileName: 'fileName'
    }
    comments.unshift(head);
    createTable(comments);
    getTable(comments);
}

function getLength(item) {
    return item.comment.split(/!/).length - 1;
}

function sortImports(item1, item2) {
    return getLength(item2) - getLength(item1);
}

function sortUsers(item1, item2) {
    let collator = new Intl.Collator(undefined, {
        usage: 'search'
    });
    if (item1.user.length !== 0 && item2.user.length !== 0) {
        return collator.compare(item1.user, item2.user);
    }
    return (item1.user.length == 0) - (item2.user.length == 0);
}

let dataType = /^(((19|[2-9]\d)\d{2})|(((19|[2-9]\d)\d{2})\-(0[13578]|1[02]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012]))|(((19|[2-9]\d)\d{2})\-(0[13578]|1[02])\-(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012])\-(0[1-9]|[12]\d|30)))$/

function sortDate(item1, item2) {
    if (item1.date.match(dataType) !== null && item2.date.match(dataType) !== null) {
        return new Date(item2.date) - new Date(item1.date);
    }
    return (item1.date.match(dataType) == null) - (item2.date.match(dataType) == null);
}
module.exports = {
    sort,
};