const request = require("request");
const fs = require("fs");
for (let a = 0; a < fs.readdirSync("./workspace/").length; a++) {
    console.log(fs.readdirSync("./workspace/")[a])
    let klasa = fs.readFileSync(`./workspace/${fs.readdirSync("./workspace/")[a]}`).toString().split("\t");
    for (let i = 0; i < klasa.length; i++) {
        klasa[i] = klasa[i].split("\n");
    }
    let fArray = [];
    for (let i = 0; i < klasa.length; i++) {
        let str = "";
        for (let j = 0; j < klasa[i].length; j++) {
            if (isNaN(klasa[i][j])) {
                str += klasa[i][j] + "\n";
            }
        }
        fArray.push(str);
    }
    let table = [[], [], [], [], [], []];
    for (let i = 0; i < fArray.length - 1; i++) {
        table[i % 6].push(fArray[i + 1]);
    }
    for (let i = 0; i < table.length; i++) {
        for (j = 0; j < table[i].length; j++) {
            table[i][j] = table[i][j].replace(/\n/g, "");
            table[i][j] = table[i][j].replace(/\r/g, "");
        }
    }
    //obrobione
    for (let i = 1; i < table.length; i++) {
        for (j = 0; j < table[i].length; j++) {
            table[i][j] = table[i][j].split(" ");
        }
    }
    //posplitowane
    for (let i = 1; i < table.length; i++) {
        for (j = 0; j < table[i].length; j++) {
            if (table[i][j].length === 5) {
                if (table[i][j][0].startsWith("Wych")) {
                    table[i][j] = [table[i][j][0], table[i][j][1], table[i][j][2].slice(0, 3), table[i][j][2].slice(3), table[i][j][3], table[i][j][4]];
                } else if (table[i][j][2].slice(0, 2).startsWith("B")) {
                    table[i][j] = [table[i][j][0], table[i][j][1], table[i][j][2].slice(0, 4), table[i][j][2].slice(4), table[i][j][3], table[i][j][4]];
                } else {
                    if (table[i][j][0].includes("środkówtransportu") || table[i][j][0].includes("Zajęciapraktycz")) {
                        table[i][j] = [table[i][j][0], table[i][j][1], table[i][j][2].slice(0, 1), table[i][j][2].slice(1), table[i][j][3], table[i][j][4]];
                    } else {
                        table[i][j] = [table[i][j][0], table[i][j][1], table[i][j][2].slice(0, 2), table[i][j][2].slice(2), table[i][j][3], table[i][j][4]];
                    }
                }
            } else if (table[i][j].length === 9 && table[i][j][0].includes("angi")) {
                table[i][j] = ["Język angielski", "Ewa, Sebastian, Iwona, Sandra", [20, 22, 30, 31]];
            } else if (table[i][j].length > 10 && table[i][j][0].includes("angi")) {
                table[i][j] = ["Język angielski", "Ewa, Sebastian, Iwona, Sandra", [16, 20, 22, 30, 31, 32]];
            } else if (table[i][j][0].includes("hiszp") && table[i][j].length > 5) {
                table[i][j] = ["Języki obce", "??", [16, 20, 21]];
            } else if ((table[i][j][0].includes("rosyj"))) {
                table[i][j] = ["Języki obce", "??", [20, 38, 31, 27, 22, 34]];
            } else if (table[i][j][0] === "J.") {
                if (table[i][j].length > 6) {
                    table[i][j] = [table[i][j][0] + " " + table[i][j][1] + "-1/2 ", table[i][j][2], table[i][j][3], table[i][j][5] + " " + table[i][j][6] + " -2/2", table[i][j][7], table[i][j][8],];

                } else {
                    table[i][j] = [table[i][j][0] + " " + table[i][j][1], table[i][j][2], table[i][j][3]];
                }
            } else if (table[i][j][0].includes("Technologieipomiarywautomatyce")) {
                table[i][j] = [table[i][j][0], table[i][j][1], table[i][j][2].slice(0, 2), table[i][j][2].slice(2), table[i][j][3], table[i][j][4]];
            }
            if (table[i][j][2] === "Sw") {
                table[i][j][2] = "SwF";
            }
        }
    }
    //poukładane przedmiot, nauczyciel, klasa lekcyjna
    let classJSON = []
    for (let i = 1; i < table.length; i++) {
        let z = 0;
        for (let j = 0; j < table[i].length; j++) {
            for (let k = 0; k < table[i][j].length / 3; k++) {
                let tName = table[i][j][1 + z];
                if (table[i][j][1 + z] && table[i][j][1 + z].includes("Wych")) tName = table[i][j][1];
                if (table[i][j][1 + z] && table[i][j][1 + z].includes("Etyka")) tName = "SI";
                if (table[i][j][1 + z] && table[i][j][1 + z].includes("Religia") && table[i][j][1 + z].includes("4D")) tName = "PS";
                if (table[i][j][1 + z] && table[i][j][1 + z].includes("niemie")) tName = "??";
                if (table[i][j][1 + z] && table[i][j][1 + z].includes("DSDIPro")) tName = "??";
                if (table[i][j][1 + z] && table[i][j][1 + z].includes("hiszpa")) tName = "??";
                if (table[i][j][1 + z] && table[i][j][1 + z].includes("Religi")) tName = "??";
                if (table[i][j][1 + z] && table[i][j][1 + z].includes("fizyczne")) tName = "??";
                classJSON.push({
                    day: i,
                    hour: j,
                    lessonName: table[i][j][0 + z],
                    teacher: tName,
                    room: table[i][j][2 + z],
                    class: `${fs.readdirSync("./workspace/")[a].split(".")[0]}`
                });
                z += 3;
            }
            z = 0;
        }
    }
    fs.writeFileSync(`./classJSONS/${fs.readdirSync("./workspace/")[a].split(".")[0]}.json`, JSON.stringify(classJSON))

    //page creation
    let page = "<!DOCTYPE HTML><html><head><style>table , th, tr {border: 1px solid black;}</style></head><body><table>";

    for (let i = 0; i < table[0].length; i++) {
        page += `<tr><th>${table[0][i]}</th>`;
        for (let j = 0; j < classJSON.length; j++) {
            if (classJSON[j].hour === i) {
                if (!classJSON[j].lessonName) {
                    page += "<th></th>"
                } else {
                    if ((classJSON[j].lessonName.includes("1/2") && classJSON[j + 1] && classJSON[j + 1].lessonName.includes("2/2")) || (classJSON[j].lessonName.includes("1/4") && classJSON[j + 1].lessonName.includes("2/4")) || (classJSON[j].lessonName.includes("1/8") && classJSON[j + 1].lessonName.includes("2/8"))) {
                        page += `<th>${classJSON[j].lessonName} <a href="http://www.ithomash.xyz/teacher/${classJSON[j].teacher}">${classJSON[j].teacher}</a> <a href="http://www.ithomash.xyz/room/${classJSON[j].room}">${classJSON[j].room}</a><br>${classJSON[j + 1].lessonName} <a href="http://www.ithomash.xyz/teacher/${classJSON[j + 1].teacher}">${classJSON[j + 1].teacher}</a> <a href="http://www.ithomash.xyz/room/${classJSON[j + 1].room}">${classJSON[j + 1].room}</a></th>`;
                        j += 1;
                    } else {
                        page += `<th>${classJSON[j].lessonName} <a href="http://www.ithomash.xyz/teacher/${classJSON[j].teacher}">${classJSON[j].teacher}</a> <a href="http://www.ithomash.xyz/room/${classJSON[j].room}">${classJSON[j].room}</a></th>`;
                    }
                }
            }
        }
        page += "</tr>"
    }
    page += "</table></body></html>";
    fs.writeFileSync(`./planyKlas/${fs.readdirSync("./workspace/")[a].split(".")[0]}.html`, page);
}