const MAX_LINES = 35;
const old_lines = [];
const new_lines = [];

export async function postText(text, pauseTime=0, text2="", textSleepTime=0,) {
    const container = document.querySelector(".content");
    const paragraph = document.createElement('p');
    paragraph.textContent = text;

    await sleep(pauseTime);
    container.appendChild(paragraph);

    if (text2 != "") {
        await sleep(textSleepTime);
        container.lastChild.textContent = container.lastChild.textContent + text2;
    }
    await checkLines()
}

export function checkLines() {
    const container = document.querySelector(".content");
    if (container.childElementCount >= MAX_LINES) {
        old_lines.push(container.firstElementChild);
        container.removeChild(container.firstChild);
    }
}

export function showNewLine() {
    const container = document.querySelector(".content");
    if (container.childElementCount >= MAX_LINES && new_lines.length != 0) {
        old_lines.push(container.firstElementChild);
        container.removeChild(container.firstChild);
        container.append(new_lines[new_lines.length - 1]);
        new_lines.pop();
    }
}

export function showOldLine() {
    const container = document.querySelector(".content");
    if (container.childElementCount >= MAX_LINES && old_lines.length != 0) {
        new_lines.push(container.lastElementChild);
        container.removeChild(container.lastChild);
        container.prepend(old_lines[old_lines.length - 1]);
        old_lines.pop();
    }
}

export function bringToNewestLine() {
    while (new_lines != 0) {
        old_lines.push(container.firstElementChild);
        container.removeChild(container.firstChild);
        container.append(new_lines[new_lines.length - 1]);
        new_lines.pop();
    }
}


async function ellipses(count, pauseTime) {
    const container = document.querySelector(".content");
    const paragraph = document.createElement('p');
    paragraph.textContent = " .";
    container.appendChild(paragraph);

    for (let i = 0; i < count - 1; i++) {
        await sleep(pauseTime);
        container.lastChild.textContent = container.lastChild.textContent + " .";
    }
}

export function clearContainer() {
    const container = document.querySelector(".content");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function userInput() {
    const paragraph = document.createElement('p');
    const span = document.createElement('span');
    paragraph.textContent = "C:\\usr\\ethan-egerton> ";
    span.id = "input";
    paragraph.appendChild(span)

    const container = document.querySelector(".content");
    container.appendChild(paragraph);
}

// Output sets
export async function bootUp() {
    postText("DBNO Modular BIOS v4.51PG. A Gold Star Ally");
    postText("Copyright (C) 1984-97, DBNO Software, Inc");
    postText(" ");
    postText("(55XWUQ0E) Intel i430VX PCIset(TM)");
    postText(" ");
    postText("PENTIUM ODP-MMX CPU at 200 MHz");
    await postText("Memory Test :  262144K", 200, "  OK", 400);
    await postText(" ");
    await postText("DBNO Plug and Play BIOS Extension v1.0A", 300);
    await postText("Copyright (C) 1999, DBNO Software, Inc", 100);
    await postText("    Detecting IDE Primary Master   ...", 400, " PCemHD", 400); 
    await postText("    Detecting IDE Primary Slave    ...", 0, " PCemHD", 100); 
    await postText("    Detecting IDE Secondary Master ...", 400, " None", 400); 
    await postText("    Detecting IDE Secondary Slave  ...", 0, " None", 100);
    await postText(" ");
    await postText(" ");
    await ellipses(3, 500);
    await sleep(300);
    clearContainer()
    await sleep(300)
    postText("|============================================================================|");
    postText("|                                                                            |");
    postText("| CPU Type             : PENTIUM ODP-MMX      Cache Memory         : 512K    |");
    postText("| CPU Clock            : 500MHz               Cache Memory         : 512K    |");
    postText("| CPU Clock            : 500MHz               Cache Memory         : 512K    |");
    postText("|                                                                            |");
    postText("|----------------------------------------------------------------------------|");
    postText("|                                                                            |");
    postText("| Deskette Drive A     : 1.33M, 3.5 in.       Display Type         : EGA/VGA |");
    postText("| Deskette Drive B     : None                 Serial Port(s)       : 3F8 2F8 |");
    postText("| Pri. Master Disk     : LBA.UDMA 33.17246MB  Parallel Port(s)     : 378     |");
    postText("| Pri. Slave Disk      : None                 EDO DRAM at Bank     : None    |");
    postText("| Sec. Master Disk     : CDROM.UDMA 33        SDRAM at Bank        : 0       |");
    postText("| Sec. Slave Disk      : None                                                |");
    postText("|                                                                            |");
    postText("|============================================================================|");
    await sleep(300)
    postText(" ");
    postText("Primary Master HDD S.M.A.R.T. capability . . . . Disabled");
    postText(" ");
    postText(" ");






    await sleep(300);
    clearContainer()

    await sleep(300);
    userInput()
    }