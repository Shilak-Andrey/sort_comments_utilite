const path = require('path');
const IMPORTANT_COLUMN_MAX = 1;
const USER_COLUMN_MAX = 10;
const DATA_COLUMN_MAX = 10;
const COMMENT_COLUMN_MAX = 50;
const FILENAME_COLUMN_MAX = 15;

function show(content) {
    let regex = /\/\/ TODO.*/gi;
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

function findComments(array, reg) {
    let commentsArray = [];
    for (let i = 0; i < array.length; i++) {
        let comment = array[i].match(reg);
        let nameFile = path.basename(array[i]);
        if (comment === null) {
            continue;
        }
        for (let j = 0; j < comment.length; j++) {
            comment[j] = comment[j] + '; ' + nameFile;
        }
        commentsArray.push(comment);
    }
    return commentsArray;
}

function deleteTodoFindImportant(comments) {
    for (let k = 0; k < comments.length; k++) {
        if (comments[k].toString().match(/\/\/ TODO.*;.*;/i) == null) {
            comments[k] = comments[k].toString().replace(/\/\/ TODO/gi, ';').split(';');
            comments[k].unshift('');
        } else {
            comments[k] = comments[k].toString().replace(/\/\/ TODO/i, '').split(';');
        }
        if (comments[k][2].toString().match(/!$/gim)) {
            comments[k].unshift('  !  ');
        } else {
            comments[k].unshift('');
        }
    }
}

function getLength(array, value, cons) {
    let max = 0;
    array.map(function(obj) {
        if (obj[value].length > max) {
            max = obj[value].length;
        }
        if (max > cons) {
            max = cons;
        }
    })
    return max;
}

function createTable(array) {
    let userMaxlength = getLength(array, 'user', USER_COLUMN_MAX);
    let dataMaxLength = getLength(array, 'date', DATA_COLUMN_MAX);
    let commMaxLength = getLength(array, 'comment', COMMENT_COLUMN_MAX);
    let fileMaxLength = getLength(array, 'fileName', FILENAME_COLUMN_MAX);
    array.map(function(item) {
        if (item.important.length < IMPORTANT_COLUMN_MAX) {
            item.important = ' '.repeat(5) + '|';
        } else {
            item.important = '  ' + item.important + '  |';
        }
        if (item.user.length > USER_COLUMN_MAX) {
            item.user = '  ' + item.user.slice(0, 7) + '...  |';
        } else {
            item.user = '  ' + item.user + ' '.repeat(userMaxlength - item.user.length) + '  |';
        }
        if (item.date.length >= DATA_COLUMN_MAX) {
            item.date = '  ' + item.date + ' '.repeat(DATA_COLUMN_MAX - item.date.length) + '  |';
        } else {
            item.date = '  ' + item.date + ' '.repeat(dataMaxLength - item.date.length) + '  |'
        }
        if (item.comment.length > COMMENT_COLUMN_MAX) {
            item.comment = '  ' + item.comment.slice(0, 47) + '...  |';
        } else {
            item.comment = '  ' + item.comment + ' '.repeat(commMaxLength - item.comment.length) + '  |';
        }
        if (item.fileName.length > FILENAME_COLUMN_MAX) {
            item.fileName = '  ' + item.fileName.slice(0, 13) + '...  ';
        } else {
            item.fileName = '  ' + item.fileName + ' '.repeat(fileMaxLength - item.fileName.length) + '  ';
        }
    })
    let elem = array[0];
    let sum = 0;
    for (let summ in elem) {
        sum += elem[summ].length;
    }
    let lines = '-'.repeat(sum);
    array.splice(1, 0, {
        lines
    });
    if (array.length > 2) {
        array.push({
            lines
        });
    }
    return array;
}

function makeArrayObjects(array) {
    for (let d = 0; d < array.length; d++) {
        let obj = array[d];
        for (let m = 0; m < obj.length; m++) {
            array[d] = {
                important: obj[0].trim(),
                user: obj[1].trim(),
                date: obj[2].trim(),
                comment: obj[3].trim(),
                fileName: obj[4].trim()
            }
        }
    }
}

function getTable(array) {
    let result = ``;
    for (let m = 0; m < array.length; m++) {
        let res = ``;
        let obj = array[m];
        for (let key in obj) {
            res += obj[key];
        }
        result += '\n' + res;
    }
    console.log(result);
}
  
module.exports = {
    show,
    findComments,
    deleteTodoFindImportant,
    makeArrayObjects,
    createTable,
    getTable,
};