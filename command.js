const end = 1000;
const create = "create";
const open = "open";
const save = "save";
const wait = "wait";
export const command = [
    // ********** PLAYGROUND *****************



    { "file": [open, "index.html"] },
    { "goto": [6, 12] },
    { "text": [`Voyalabs - welcome to the creative world of custom design and branding`, 100] },
    { "cmd": save },
    { "cmd": wait },
    { "goto": [9, 1] },
    { "text": [`    <h1>Hello world !</h1>`,100]},
    { "cmd": wait },
    { "file": [open , "Styles/Universal.css"] },
    { "text": [
`h1{
    font-size: 30px;
    font-weight: 900;
    color: red;
    background-color: blue;
}`
     , 50]},
    { "cmd" : save },
    { "goto": [5 , end]},
    { "text": [
    `
    background-color: green;` , 50]},
    { "cmd" : save },
    { "text": [
    `
    background-color: red;` , 50]},
    { "cmd" : save },
    { "text": [
    `
    background-color: yellow;` , 50]},
    { "cmd" : save },
    { "text": [
    `
    background-color: orange;` , 50]},
    { "cmd" : save },
    { "text": [
    `
    background-color: orchid;` , 50]},
    { "cmd" : save },




    // ********** PLAYGROUND *****************
]

