const fs = require("fs");
let classses = fs.readdirSync("./classJSONS/");
let rooms = []
let teachers = []
for (let i =0 ;i < classses.length;i++) {
    let file = JSON.parse(fs.readFileSync(`./classJSONS/${classses[i]}`).toString());
    for (let j = 0;j<file.length;j++) {
        if (file[j].teacher==="58" || file[j].teacher==="40") console.log(file[j])
        if (!teachers.includes(file[j].teacher)) teachers.push(file[j].teacher);
    }
}
fs.writeFileSync("./planyNauczycieli/nauczyciele.txt", JSON.stringify(teachers.sort()))

for (let i =0 ;i < classses.length;i++) {
    let file = JSON.parse(fs.readFileSync(`./classJSONS/${classses[i]}`).toString());
    for (let j = 0;j<file.length;j++) {
        if (!rooms.includes(file[j].room)) rooms.push(file[j].room);
    }
}
fs.writeFileSync("./planySal/sale.txt", JSON.stringify(rooms.sort()))
