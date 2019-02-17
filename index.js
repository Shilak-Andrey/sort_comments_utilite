const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');
const { show } = require('./show');
const { important } = require('./important');
const { user } = require('./user'); 
const { sort } = require('./sort');
const { date } = require('./date');

app();

function app () {
    const files = getFiles();
   
    console.log('Please, write your command!');
    readLine(processCommand);
}

function getFiles () {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path) + '\n' + path);
}

function processCommand (command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            show(getFiles());
            break;
        case 'important':
            important(getFiles());
            break;
        case 'user' + ` ${command.slice(5)}` :
            user(getFiles(),command.slice(5));
            break;
        case 'sort' + ` ${command.slice(5)}` :
            sort(getFiles(),command.slice(5));
            break;
        case 'date' + ` ${command.slice(5)}` :
            date(getFiles(),command.slice(5));
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
