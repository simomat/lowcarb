import {returnTrue, safeMaybeOf} from './utils';
import {setSyncStorage} from './webext';

export const doMigrationCheck = () =>
    safeMaybeOf(() => browser.storage.local.get())
        .map(storage => {
            let targetStorage = {};

            if (storage.settings !== undefined) {
                targetStorage.settings = storage.settings;
            }

            if (storage.whitelistDomains !== undefined) {
                targetStorage.whitelistDomains = storage.whitelistDomains;
            }

            if (Object.keys(targetStorage).length > 0) {
                console.log(`migrate local storage to sync storage for ${JSON.stringify(targetStorage)}`);
                return setSyncStorage(targetStorage)
                    .map(() => safeMaybeOf(() => browser.storage.local.clear().then(returnTrue)))
                    .orElse(error => {
                        console.log(`migration of local storage to sync storage failed: ${error}`);
                        return true;
                    });
            }

            console.log('migration check: no migration required');
            return true;
        });
