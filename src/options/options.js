import {View} from './view';
import {Presenter} from './presenter';
import {ModelStore} from './modelstore';
import {bindControls} from './bindControls';

let view = new View(document.getElementById('whitelist'));
let presenter = new Presenter(view, new ModelStore());

window.addEventListener('unload', () => presenter.persistModel());

bindControls(
    document.getElementById('removeCookies'),
    document.getElementById('reload'),
    document.getElementById('removeOnStartup'),
    presenter
);

presenter.refresh();