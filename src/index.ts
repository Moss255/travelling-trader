
import Game from './game';
import './index.css';
import { Application } from 'pixi.js';

const app = new Application({
    background: '#1099bb',
    resizeTo: window,
});

new Game(app);

document.body.appendChild(app.view as any);
