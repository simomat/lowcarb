import { loadSettings, saveSettings } from '../settings';

export const mutateSettings = async mutator => {
    const settings = await getSettings();
    mutator(settings);
    saveSettings(settings);
};

export const getSettings = () => loadSettings().asPromise();