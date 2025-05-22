import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { TranslateCustomService } from './translate.service';

export class TranslationLoader implements TranslateLoader {
	constructor(private ngxcustom: TranslateCustomService) { }

	public getTranslation(lang: string): any {
    const languageObj = dictionary.find((x) => x.language === lang);
    const pk = languageObj ? languageObj.pk : 287;
		//return this.api.getTranslationsFromApi(lang) as Observable<object>;
		return this.ngxcustom.getTranslates(pk) as Observable<object>;
	}
}
const dictionary: any[] = [
  {
    pk: 286,
    language: 'en-US',
  },
  {
    pk: 287,
    language: 'es-MX',
  },
  // Agrega más entradas de diccionario según sea necesario
];
