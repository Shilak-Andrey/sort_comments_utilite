
const {
    findComments,
    deleteTodoFindImportant,
    makeArrayObjects,
    createTable,
    getTable
} = require('./show');

function user(content, username) {
    if(username.trim().length === 0){
        return console.log('wrong command');
    }
    let name = new RegExp('\/\/ TODO ' + username + '.*', 'ig');
    let comments = findComments(content, name);
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
    user,
};
