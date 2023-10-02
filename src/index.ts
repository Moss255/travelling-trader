
import Game from './game';
import './index.css';
import { Application } from 'pixi.js';
import { sound } from '@pixi/sound';

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

sound.add('al-hajj', 'assets/audio/al-hajj.ogg');
sound.volume('al-hajj', 0.005);
sound.play('al-hajj');

app.stage.emit('restart');



document.querySelector('#app')?.appendChild(app.view as any);
