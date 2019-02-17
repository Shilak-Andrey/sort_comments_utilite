const {
    findComments,
    deleteTodoFindImportant,
    makeArrayObjects,
    createTable,
    getTable
} = require('./show');

function important(content) {
    let regex = /\/\/ TODO.*!$/gim; 
    let comments = findComments(content, regex);
    comments = [].concat(...comments);
    deleteTodoFindImportant(comments);
    makeArrayObjects(comments);
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
    important,
};