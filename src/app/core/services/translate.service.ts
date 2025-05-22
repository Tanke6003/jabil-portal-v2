import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, timeout } from 'rxjs/operators';
import { LoadConfigService } from './load-config.service';


@Injectable(
  {
    providedIn:'root'
  }
)
export class TranslateCustomService {
  private translateApiURL: string = '';
  public translationsLoadedFromApi: boolean = false;
  public translationLoaded = signal(false);
  public transitionKey = '';

  constructor(
    private _http: HttpClient,
    private _loadConfigService: LoadConfigService
  ) {}

  getTranslates(languagepk: number): Observable<any> {

      this.translateApiURL = this._loadConfigService.getConfig().translateApiUrl;
      this.transitionKey = this._loadConfigService.getConfig().translateApiKey;
   
    // Mapea el número a un código de idioma
    const languageObj = dictionary.find((x) => x.pk === languagepk);
    const language = languageObj ? languageObj.language : 'es-MX'; // Usa 'en-US' como valor predeterminado si no se encuentra el idioma
    const timeOutMs=1000;//1000
    if(this.transitionKey == "" || this.translateApiURL == "")
      return this.getLocalTranslations(language);
    const headers = new HttpHeaders()
  .set('x-api-key',  this.transitionKey)
    // Intenta obtener las traducciones desde la API
    return this._http.get(`${this.translateApiURL}languages/${languagepk}/translations`,{ headers }).pipe(
      timeout(timeOutMs),
      catchError(() => {
        return this.getLocalTranslations(language);
      }),
      switchMap((translations) => {
        console.debug("traduce de api")
        this.translationsLoadedFromApi = true;
        this.translationLoaded.update(value =>true);
        return of(translations);
      })
    );
  }

  private getLocalTranslations(language: string): Observable<any> {
    const localTranslationsFile = `assets/i18n/${language}.json`;
    return this._http.get(localTranslationsFile).pipe(
      catchError(() => {

        return of({});
      }),
      switchMap((translations) => {
        console.warn("traduce de local")
        if (!this.translationsLoadedFromApi) {
          this.translationsLoadedFromApi = false;
        }
        this.translationLoaded.update(value =>true);
        return of(translations);
      })
    );
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

];
