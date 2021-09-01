const fs = require("fs");
let classes = fs.readdirSync("./classJSONS/");
let teachers = ["AB", "AF", "AG", "AJ", "AL", "AM", "AR", "AS", "AW", "CKP1", "CKP2", "DR", "DS", "EG", "EI", "EP", "Ewa, Sebastian, Iwona, Sandra", "FN", "GI", "GL", "GR", "HK", "IS", "JG", "JJ", "JO", "JR", "JT", "KG", "KJ", "KL", "KM", "KP", "KS", "KZ", "MI", "MJ", "MN", "MP", "MR", "MS", "MT", "MW", "NI", "NM", "OK", "PA", "PI", "PK", "PS", "RA", "RG", "RK", "RM", "RO", "RP", "RT", "SB", "SG", "SJ", "SK", "SL", "SO", "SR", "SW", "SZ", "Starosta", "SŁ", "TE", "TS", "WK", "WL", "WM", "WO", "WR", "WS", "WZ", "ZF", "ZI", "ZW", "ŁG", null]
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
// teachers.length
for (let i = 0; i < teachers.length; i++) {
    let tempTeacher = [];
    for (let j = 0; j < allLessons.length; j++) {
        if (allLessons[j].teacher === teachers[i]) tempTeacher.push(allLessons[j]);
    }
    let page = "<!DOCTYPE HTML><html><head><style>table , th, tr {border: 1px solid black;height: 50px; min-width: 100px;}</style></head><body><table>";
    for (let j = 0; j < 10; j++) {
        page += "<tr>"
        for (let k = 0; k < 6; k++) {
            let tempBool = false;
            let index = -1;
            for (let l = 0; l < tempTeacher.length; l++) {
                if (tempTeacher[l].day === k && tempTeacher[l].hour === j) {
                    tempBool = true;
                    index = l
                }
            }
            if ((j % 6 && k==0 )|| (j==0 && k==0) || (j==6&&k==0)) {
                page += `<th>${hours[j]}</th>`;
            } else if (tempBool === true) {
                page += `<th>${tempTeacher[index].lessonName} <a href="http://www.ithomash.xyz/room/${tempTeacher[index].room}">${tempTeacher[index].room}</a> <a href="http://www.ithomash.xyz/teacher/${tempTeacher[index].teacher}">${tempTeacher[index].teacher}</a> <a href="http://www.ithomash.xyz/class/${tempTeacher[index].class}">${tempTeacher[index].class}</a></th>`;
            } else {
                page += `<th></th>`;
            }
            tempBool = false;
        }
        page += "</tr>"
    }
    page += "</table></body></html>";
    tempTeacher = [];
    fs.writeFileSync(`./planyNauczycieli/${teachers[i]}.html`, page);
}