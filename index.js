import clipboardy from "clipboardy";
import { arrangeCommands, create, end, readyCommands, save } from "./main.js";
const command = [

    // ********** PLAYGROUND *****************



    { "file": [create, "index.html"] },
    { "goto": [1, 1] },
    {
        "text": [`
<!DOCTYPE html>
<html lang="en">
<head>

</head>
<body>
    
</body>
</html>
        ` , 100]
    },
    { "cmd": save },
    { "goto": [5, 1] },
    { "text": [`
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jai Rawat</title>
    `
        , 100] },




    // ********** PLAYGROUND *****************
]
arrangeCommands(command)
clipboardy.writeSync(JSON.stringify(readyCommands, null, 2));


