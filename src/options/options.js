import {View} from './view';
import {Presenter} from './presenter';
import {ModelStore} from './modelstore';
import {webext} from '../webExtApi';

let view = new View(document.getElementById('whitelist'));
let presenter = new Presenter(view, new ModelStore());

window.addEventListener('unload', () => presenter.persistModel());
document.getElementById('removeCookies').addEventListener('click', () => {
    presenter.persistModel()
        .then(() => webext.sendMessage({command: 'removeCookies'}))
        .then(() => presenter.refresh());
});
document.getElementById('reload').addEventListener('click', () => {
    presenter.persistModel()
        .then(() => webext.sendMessage({command: 'refresh'}))
        .then((() => presenter.refresh()));
});

presenter.refresh();
