import { FluentBundle } from 'fluent';
// @ts-ignore
import enCaFile from '../../localization/en-CA.ftl';
// @ts-ignore
import ruRuFile from '../../localization/ru-RU.ftl';

const langCodeLsKey: string = 'langCode';
let currentLangCode = window.localStorage.getItem(langCodeLsKey) || 'enCA';

export type LangKey = 'enCA' | 'ruRU';

export enum Langs {
  enCA = 'Eng',
  ruRU = 'Rus',
}

export function setLang(langKey: LangKey) {
  window.localStorage.setItem(langCodeLsKey, langKey);
  location.reload();
}

//
// I don't know how to add new locales in FluentBundle, it has a very poor docs.
// Also, this version is outdated, and I don't want to update or replace it.
// So, I just created new bundles, it works well enough
//

async function buildBundle(key: string, langFile: any): Promise<FluentBundle> {
  let lang: string = await (await fetch(langFile)).text();

  const bundle = new FluentBundle([key], {
    useIsolating: true,
    functions: {
      REF: ([key]: string[], params: { [key: string]: string | number }) => {
        const message = bundle.getMessage(key);
        if (!message) {
          console.error(`\`ref\` lookup failed. Unknown key ${key}`);
          return key;
        }
        return bundle.format(message, params);
      },
    },
  });
  const errors = bundle.addMessages(lang);
  for (const error of errors) {
    console.error(error);
  }
  return bundle;
}

// here we wrap code in promise to be able to use `await` for building bundles dictionary
const bundles: Promise<Record<string, FluentBundle>> = new Promise(async resolve => {
  let ruRU = await buildBundle('ru-RU', ruRuFile);
  let enCA = await buildBundle('en-CA', enCaFile);

  resolve({ ruRU, enCA });
});

/**
 * Main l10n function, takes message key and returns it according to current language
 */
export default async function loc(key: string, params?: { [key: string]: string | number }) {
  const b = (await bundles)[currentLangCode];
  const message = b.getMessage(key);
  if (!message) {
    console.error(`Unknown message ${key}`);
    return key;
  }
  const errors: string[] = [];
  const result = b.format(message, params, errors);
  for (const error of errors) {
    console.error(error);
  }
  return result;
}
