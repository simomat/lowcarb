import {getEnv} from './utils';
import {onBrowserActionClicked, openOptionsPage} from './webext';

export const setupActionButton = () => {
    getEnv().map(env => {
        if (env.os !== 'android') {
            onBrowserActionClicked(openOptionsPage);
        }
    });
};