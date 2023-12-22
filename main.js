// const commandExample = [
//     { "file": ["open/create", "path"] },
//     { "goto": ["line", "column"] },
//     { "cmd": "save/wait manual time/number of delay time" },
//     { "text": [`code in text`, "delay"] }
// ]

// ************** real code ********

export const readyCommands = [];
export const end = 1000;
export const create = "create";
export const save = "save";
export const wait = "wait";

export const arrangeCommands =(commands)=> {
    commands.map(command => {

        // typeText

        if (command.text) {
            const _command = {};
            _command.type = "typeText"
            _command.text = command.text[0].split('\n').map(line => line.trim());
            _command.delay = command.text[1];
            readyCommands.push(_command);
        }

        // goto

        if (command.goto) {
            const _command = {};
            _command.type = "goto"
            _command.line = command.goto[0]
            _command.column = command.goto[1]
            readyCommands.push(_command);
        }

        if (command.file) {

            // openFile

            if (command.file[0] === "open") {
                const _command = {};
                _command.type = "openFile"
                _command.path = command.file[1];
                readyCommands.push(_command);
            }

            // createFile

            if (command.file[0] === "create") {
                const _command = {};
                _command.type = "createFile"
                _command.path = command.file[1];
                readyCommands.push(_command);
            }
        }


        if (command.cmd) {

            // save

            if (command.cmd === "save"){
                const _command = {};
                _command.type = "command";
                _command.command = "workbench.action.files.save";
                readyCommands.push(_command);
            }

            // manual wait

            if (command.cmd === "wait"){
                const _command = {};
                _command.type = "wait";
                _command.delay = "manual";
                _command.save = true;
                readyCommands.push(_command);
            }

            // wait with time

            if (typeof command.cmd === "number"){
                const _command = {};
                _command.type = "wait";
                _command.delay = command.cmd;
                readyCommands.push(_command);
            }
        }

    });


}


