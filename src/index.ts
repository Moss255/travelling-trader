
import Game from './game';
import './index.css';
import { Application } from 'pixi.js';

const app = new Application({
    background: '#1099bb',
    width: window.innerWidth,
    height: window.innerHeight
});

const scenes: any[] = [];

app.stage.on('restart', () => {
    app.stage.removeChildren();
    scenes.pop();
    scenes.push(new Game(app));
})

app.stage.emit('restart');



document.querySelector('#app')?.appendChild(app.view as any);
