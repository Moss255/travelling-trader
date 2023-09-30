
import Game from './game';
import './index.css';
import { Application } from 'pixi.js';

const app = new Application({
    background: '#1099bb',
    resizeTo: window,
});

const scenes: any[] = [];

app.stage.on('restart', () => {
    app.stage.removeChildren();
    scenes.pop();
    scenes.push(new Game(app));
})

app.stage.emit('restart');

document.body.appendChild(app.view as any);
