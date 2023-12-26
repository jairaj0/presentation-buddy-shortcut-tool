//     { "file": ["open/create", "path"] },
//     { "goto": ["line", "column"] },
//     { "cmd": "save/wait manual time/number of delay time" },
//     { "text": [`code in text`, "delay"] }
//     { "linebyline": [`code in text`,[line , column] , "delay" , wait/1000 }
//     { "css": [`code in text`,[line , column] , "delay" , wait/1000 }
//     { "emmet": ["code in text" , "delay"] }
//     { "line": [lineNo , no of lines] }


const end = 1000;
const create = "create";
const open = "open";
const save = "save";
const wait = "wait";
export const command = [
  { "file": ["open", "Styles/test.css"] },
  { "cmd": wait },
  { "css": [
`
*,
body{
  margin: 0;
  padding: 0;
  box-sizing: border-;
  font-family: "Jost", sans-serif;
  scroll-behavior: smooth;
}
`,[1,1], 50 , 1000] },


{ "line": [8 , 20] },
{ "cmd": wait },
{ "css": [
`
.text,
.text * {
  font-family: "IBM Plex Mono", monospace;
}
`,[28,1], 50 , 100] },
]


