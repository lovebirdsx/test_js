const json1 = '{"Actions":[{"Name":"ShowMessage","Params":{"Content":"你好，欢迎来到艾尔！"}}],"_ActionsFolded":false}';
console.log(JSON.parse(json1));

// const json2 = '{\\"Actions\\":[{\\"Name\\":\\"ShowMessage\\",\\"Params\\":{\\"Content\\":\\"你好，欢迎来到艾尔！\\"}}],\\"_ActionsFolded\\":false}';
// console.log(JSON.parse(json2));

console.log(JSON.parse(''));
