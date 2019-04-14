export function parseHotKey(x) {
    let file = parseFile(x);
    let objs = file.map(x => buildObject(x));
    return objs;
}

const keyItem = (title, tip, cmd, key, colour, rstip, rskey) => (
    {
        title: title,
        tip: tip,
        cmd: cmd,
        key: key,
        colour: colour,
        researchTip: rstip,
        researchKey: rskey
    }
);

function buildObject(str) {
    let obj = new keyItem();

    const regTitle = /\[(.*?)]/g;
    const regKey = /Hotkey=[^\s]+/gs;
    const regCmd = /\[(.*?)]/g;
    const regTip = /Tip(.*)Hotkey/gs;

    let cmd = parseObject(regCmd, str);
    if(cmd.length > 1) obj.cmd = cmd[1];

    let tip = parseObject(regTip, str);
    if(tip.length > 1) obj.tip = tip[1].replace("=", "");

    let key = parseObject(regKey, str);
    if(key.length > 0) obj.key = key[0].replace("Hotkey=", "");

    //console.log(obj);
    return obj;
}

function parseObject (regex, str) {
    let m;
    let rs = [];
    while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            rs.push(match);
            //console.log(`Found match, group ${groupIndex}: ${match}`);
        });
    }
    return rs;
}

function parseFile(file) {
    const regex = /(\/\/|\?)(.*?)(?:(?:\r*\n){2}|(?=\/\/|\?))/gs;
    const regSq = /\[(.*?)]/g;
    let m;
    let rs = [];
    while ((m = regex.exec(file)) !== null) {

        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        m.forEach((match, groupIndex) => {
            if(regSq.test(match)) {
                //console.log(`Found match, group ${groupIndex}: ${match}`);
                rs.push(match);
            }
        });
    }
    return rs;
}

