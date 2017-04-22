import {webext} from '../webExtApi';
import {loadSettings, saveSetting} from '../settings';

export function bindControls(removeCookies, reload, removeOnStartup, presenter) {
    removeCookies.addEventListener('click', () => {
        presenter.persistModel()
            .then(() => webext.sendMessage({command: 'removeCookies'}))
            .then(() => presenter.refresh());
    });

    reload.addEventListener('click', () => {
        presenter.persistModel()
            .then(() => webext.sendMessage({command: 'refresh'}))
            .then((() => presenter.refresh()));
    });

    loadSettings()
        .then(settings => {
            removeOnStartup.checked = settings.removeOnStartup;
            removeOnStartup.addEventListener('change', () =>
                saveSetting('removeOnStartup', removeOnStartup.checked));
        });
}