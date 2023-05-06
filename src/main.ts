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
  const chars: string[] = []

  const noteEl = document.querySelector('#note');
  noteEl?.addEventListener('keypress', (evt: Event) => {
    console.log(evt);

    const keyEvt = evt as KeyboardEvent;

    chars.push(keyEvt.key);

    // read command via tokens and transform current line of text to MD
    
  })
});
