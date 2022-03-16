import Runner from "./Runner";

window.addEventListener('load', () => {
    const runner = new Runner(document.getElementById('canvas') as HTMLCanvasElement);
    runner.start();
});