import { invoke } from "@tauri-apps/api/tauri";

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

async function greet() {
    if (greetMsgEl && greetInputEl) {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        greetMsgEl.textContent = await invoke("greet", {
            name: greetInputEl.value,
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const noteEl = document.querySelector("#note") as HTMLDivElement;
    noteEl?.addEventListener("keydown", (evt: KeyboardEvent) => {
        // evt.preventDefault();
        console.log(evt);

        if (evt.key === 'Backspace' || evt.key === 'Delete') {
            
        }

        const element = evt.target as HTMLDivElement;

        console.log(element.innerText);

        // read tokens and transform current line(s) of text to MD
        if (element.innerText === '' && evt.key === '#') {
            const span = document.createElement('span');
            // set text
            span.innerText = '#';
            // set styles
            span.classList.add('super-h1');

            noteEl.appendChild(span);
            evt.preventDefault();
        }
    });
});
