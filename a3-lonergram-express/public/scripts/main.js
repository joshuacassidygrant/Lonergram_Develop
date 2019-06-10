let messageModule = new MessageDisplayModule();
let messageFormModule = new MessageFormModule(messageModule);

let toggleControls = () => {
  document.getElementById("right-hand-column").classList.toggle("controls-collapsed");
}
