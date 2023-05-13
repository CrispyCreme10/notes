// VARS
// (x_ denotes an html element)
let x_title: HTMLDivElement | null;
let x_titleBarText: HTMLSpanElement | null;
let x_note: HTMLDivElement | null;
let x_currentNoteLine: HTMLDivElement | null;

window.addEventListener("DOMContentLoaded", () => {
    // setup vars
    x_title = document.querySelector("#title") as HTMLDivElement;
    x_titleBarText = document.querySelector("#title-bar > span") as HTMLSpanElement;
    x_note = document.querySelector("#note") as HTMLDivElement;

    initNoteTitle();
    initNoteLine();
});

function initNoteTitle() {
    x_title?.addEventListener("keydown", (evt: KeyboardEvent) => {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            setCurrentNoteLine(0);
        }
    });

    x_title?.addEventListener("keyup", (evt: KeyboardEvent) => {
        const target = (evt.target as HTMLDivElement);
        if (x_titleBarText) {
            x_titleBarText.innerText = target.innerText;
        }
    });
}

function initNoteLine() {
    createNoteLine();
    setCurrentNoteLine(0);
}

function setCurrentNoteLine(index: number) {
    if (index < 0) {
        x_title?.focus();
        return;
    }

    x_currentNoteLine = x_note?.children[index] as HTMLDivElement;
    if (!x_currentNoteLine) {
        createNoteLine();
        x_currentNoteLine = x_note?.children[index] as HTMLDivElement;
    }
    
    x_currentNoteLine.classList.add('line-active');
    x_currentNoteLine?.focus();
    // placeCursor(x_currentNoteLine);
    x_currentNoteLine?.addEventListener('keydown', (evt: KeyboardEvent) => {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            console.log('enter');
            x_currentNoteLine?.classList.remove('line-active');
            createNoteLine();
            setCurrentNoteLine(index + 1);
        }

        const target = evt.target as HTMLDivElement;

        if (target.innerText === '' && evt.key === 'Backspace') {
            // delete current note line and focus previous
            console.log('remove');
            x_currentNoteLine?.remove();
            setCurrentNoteLine(index - 1);
        }
    });
}

function createNoteLine() {
    const x_lineBreak = document.createElement('br');
    const x_lineDiv = document.createElement('div');
    x_lineDiv.classList.add('x-line');
    x_lineDiv.setAttribute('contenteditable', '');
    // x_lineDiv.appendChild(x_lineBreak);
    x_note?.appendChild(x_lineDiv);
}

function placeCursor(node: HTMLElement) {
    const range = document.createRange();
    range.selectNode(node);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    console.log(node);
    console.log(range);
    console.log(sel);
    node.focus();
}


