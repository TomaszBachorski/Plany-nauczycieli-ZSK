const fs = require("fs");
let classrooms = ["16", [16, 20, 21], [16, 20, 22, 30, 31, 32], "21", "22", "23", "26", "27", "271", "28", "30", "31", "32", "33", "34", "36", "37", "38", "40", "41", "42", "43", "44", "46", "47", "48", "50", "51", "56", "57", "58", "61", "62", "@", "B101", "B102", "B103", "B104", "B105", "B106", "B107", "B108", "B109", "B201", "B202", "B203", "B204", "B205", "BSG", "BSG1", "DS", "KZ", "SG", "SG1", "SG2", "SG3", "SG4", "Sw", "SwF", null]
let classes = fs.readdirSync("./classJSONS/");
let allFiles = []
let allLessons = []
let hours = ["7:10- 7:55", "8:00- 8:45", "8:50- 9:35", "9:50-10:35", "10:40-11:25", "11:30-12:15", "12:30-13:15", "13:20-14:05", "14:10-14:55", "15:00-15:45"]
for (let i = 0; i < classes.length; i++) {
    allFiles.push(JSON.parse(fs.readFileSync("./classJSONS/" + classes[i]).toString()));
}
for (let i = 0; i < allFiles.length; i++) {
    for (let j = 0; j < allFiles[i].length; j++) {
        allLessons.push(allFiles[i][j]);
    }
}

for (let i = 0; i < classrooms.length; i++) {
    let tempRoom = [];
    for (let j = 0; j < allLessons.length; j++) {
        if (allLessons[j].room === classrooms[i]) tempRoom.push(allLessons[j]);
    }
    let page = "<!DOCTYPE HTML><html><head><style>table , th, tr {border: 1px solid black;height: 50px; min-width: 100px;}</style></head><body><table>";
    for (let j = 0; j < 10; j++) {
        page += "<tr>"
        for (let k = 0; k < 6; k++) {
            let tempBool = false;
            let index = -1;
            for (let l = 0; l < tempRoom.length; l++) {
                if (tempRoom[l].day === k && tempRoom[l].hour === j) {
                    tempBool = true;
                    index = l
                }
            }
            if ((j % 6 && k == 0) || (j == 0 && k == 0) || (j == 6 && k == 0)) {
                page += `<th>${hours[j]}</th>`;
            } else if (tempBool === true) {
                page += `<th>${tempRoom[index].lessonName} <a href="http://www.ithomash.xyz/room/${tempRoom[index].room}">${tempRoom[index].room}</a> <a href="http://www.ithomash.xyz/teacher/${tempRoom[index].teacher}">${tempRoom[index].teacher}</a> <a href="http://www.ithomash.xyz/class/${tempRoom[index].class}">${tempRoom[index].class}</a></th>`;
            } else {
                page += `<th></th>`;
            }
            tempBool = false;
        }
        page += "</tr>"
    }
    page += "</table></body></html>";
    tempRoom = [];
    fs.writeFileSync(`./planySal/${classrooms[i]}.html`, page);
}