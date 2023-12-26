import fs from 'fs';
import { command } from "./command.js";

// const commandExample = [
//     { "file": ["open/create", "path"] },
//     { "goto": ["line", "column"] },
//     { "cmd": "save/wait manual time/number of delay time" },
//     { "text": [`code in text`, "delay"] }
//     { "linebyline": [`code in text`,[line , column] , "delay" , wait/1000 }
//     { "css": [`code in text`,[line , column] , "delay" , wait/1000 }
//     { "emmet": ["code in text", lineNo , "delay" }
// ]

// ************** real code ********

const readyCommands = [];

const arrangeCommands = (commands) => {
    commands.map(command => {

        // typeText

        if (command.text) {
            const _command = {};
            _command.type = "typeText"
            _command.text = command.text[0].split('\n');
            _command.delay = command.text[1];
            readyCommands.push(_command);
        }

        // line insert

        if (command.line) {
            const _command_goto = {};
            _command_goto.type = "goto"
            _command_goto.line = command.line[0]
            _command_goto.column = 1000
            readyCommands.push(_command_goto);

            for (let i = 0; i < command.line[1]; i++) {
                const _command_insert_line = {};
                _command_insert_line.type = "command";
                _command_insert_line.command = "editor.action.insertLineAfter";
                readyCommands.push(_command_insert_line);
              }

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

            if (command.cmd === "save") {
                const _command = {};
                _command.type = "command";
                _command.command = "workbench.action.files.save";
                readyCommands.push(_command);
            }

            // manual wait

            if (command.cmd === "wait") {
                const _command = {};
                _command.type = "wait";
                _command.delay = "manual";
                _command.save = false;
                readyCommands.push(_command);
            }

            // wait with time

            if (typeof command.cmd === "number") {
                const _command = {};
                _command.type = "wait";
                _command.delay = command.cmd;
                readyCommands.push(_command);
            }
        }

        if (command.linebyline) {
            const lbl = command.linebyline
            const texts = lbl[0].split('\n');

            const _command_goto = {};
            _command_goto.type = "goto"
            _command_goto.line = lbl[1][0]
            _command_goto.column = lbl[1][1]
            readyCommands.push(_command_goto);

            texts.map((text, i) => {

                const _command_typeText = {};
                _command_typeText.type = "typeText"
                _command_typeText.text = i !== 0 ? ["", text] : [text];
                _command_typeText.delay = lbl[2];
                readyCommands.push(_command_typeText);

                const _command_save = {};
                _command_save.type = "command";
                _command_save.command = "workbench.action.files.save";
                readyCommands.push(_command_save);

                if (lbl[3]) {
                    const _command = {};
                    _command.type = "wait";
                    _command.delay = lbl[3];
                    readyCommands.push(_command);
                } else {
                    const _command_wait = {};
                    _command_wait.type = "wait";
                    _command_wait.delay = "manual";
                    _command_wait.save = true;
                    readyCommands.push(_command_wait);
                }
            })
        }

        if (command.css) {
            const lbl = command.css
            const texts = lbl[0].split('\n');
            texts.shift()
            texts.pop()
            texts.pop()
            let beforeOpenBrace = [];
            let afterOpenBrace = [];
            
            let foundOpenBrace = false;
            
            for (const line of texts) {
              if (line.includes('{')) {
                beforeOpenBrace.push(line);
                foundOpenBrace = true;
                beforeOpenBrace.push("","}")
              } else if (foundOpenBrace) {
                afterOpenBrace.push(line);
              } else {
                beforeOpenBrace.push(line);
              }
            }

            const _command_goto = {};
            _command_goto.type = "goto"
            _command_goto.line = lbl[1][0]
            _command_goto.column = lbl[1][1]
            readyCommands.push(_command_goto);

            const _command = {};
            _command.type = "typeText"
            _command.text = beforeOpenBrace;
            _command.delay = lbl[2];
            readyCommands.push(_command);

            const _command_lineUp = {};
            _command_lineUp.type = "command";
            _command_lineUp.command = "cursorUp";
            readyCommands.push(_command_lineUp);

            afterOpenBrace.map((text, i) => {

                const _command_typeText = {};
                _command_typeText.type = "typeText"
                _command_typeText.text = i !== 0 ? ["", text] : [text];
                _command_typeText.delay = lbl[2];
                readyCommands.push(_command_typeText);

                const _command_save = {};
                _command_save.type = "command";
                _command_save.command = "workbench.action.files.save";
                readyCommands.push(_command_save);

                if (lbl[3]) {
                    const _command = {};
                    _command.type = "wait";
                    _command.delay = lbl[3];
                    readyCommands.push(_command);
                } else {
                    const _command_wait = {};
                    _command_wait.type = "wait";
                    _command_wait.delay = "manual";
                    _command_wait.save = true;
                    readyCommands.push(_command_wait);
                }
            })
        }

        if (command.emmet) {
            const lbl = command.emmet
            const text = lbl[0];

            const _command_typeText = {};
            _command_typeText.type = "typeText"
            _command_typeText.text = [text];
            _command_typeText.delay = lbl[1];
            readyCommands.push(_command_typeText);

            const _command_tab = {};
            _command_tab.type = "command";
            _command_tab.command = "editor.emmet.action.expandAbbreviation";
            readyCommands.push(_command_tab);

        }
    });
}

arrangeCommands(command)
fs.writeFileSync('command.json', JSON.stringify(readyCommands, null, 2));


