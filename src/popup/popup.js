import {View} from './view';
import {Presenter} from './presenter';
import {ModelStore} from './modelstore';
import {webext} from '../webExtApi';

let view = new View(document.getElementById('whitelist'));
let presenter = new Presenter(view, new ModelStore());

window.addEventListener('unload', () => presenter.persistModel());
document.getElementById('removeCookies').addEventListener('click', () => webext.sendMessage({command: 'removeCookies'}));

presenter.refresh();
