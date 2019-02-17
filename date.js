const {
    findComments,
    deleteTodoFindImportant,
    makeArrayObjects,
    createTable,
    getTable
} = require('./show');

function date(content, data) {
    let dataType = /^(((19|[2-9]\d)\d{2})|(((19|[2-9]\d)\d{2})\-(0[13578]|1[02]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012]))|(((19|[2-9]\d)\d{2})\-(0[13578]|1[02])\-(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012])\-(0[1-9]|[12]\d|30)))$/
    if (!data.match(dataType)) {
        return console.log('wrong command');
    }
    let regex = /\/\/ TODO.*/gi;
    let comments = findComments(content, regex);
    comments = [].concat(...comments);
    deleteTodoFindImportant(comments);
    makeArrayObjects(comments);
    comments = comments.filter(function(item) {
        return item.date >= data;
    })
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
module.exports = {
    date,
};