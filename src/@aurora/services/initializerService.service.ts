/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthenticationService, Environment, IamService, log, SessionService } from '@aurora';
import { lastValueFrom } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
    providedIn: 'root',
})
export class InitializerService
{
    constructor(
        private readonly sessionService: SessionService,
        private readonly iamService: IamService,
        private readonly authenticationService: AuthenticationService,
        private readonly translocoService: TranslocoService,
    ) {}

    // TODO, VERIFICAR INICIO ENTRA ID, el código de la función bootstrapInitializer no funciona con
    // MS entra ID, hay que pasar todo el código a la función resolverInitializer, hay que investigar
    // method to initialize the application, before to check permission routes
    async bootstrapInitializer(): Promise<boolean>
    {
        this.checkEnvironmentSchema(environment);

        // get session from local storage and set in session observable
        this.sessionService.init();

        // checks and loads the minimum data for the correct
        // operation of the application if necessary
        await this.sessionService.loadMinimumData();

        // check token to request user
        const isAuthenticated = await lastValueFrom(this.authenticationService.check());

        if (isAuthenticated)
        {
            // get user from iam service
            const response = await lastValueFrom(this.iamService.get());

            if (response.me)
            {
                // set user preferred lang
                const userPreferredLang = this.sessionService
                    .get('langs')
                    .find(lang => lang.id === response.me.user.langId);

                if (userPreferredLang) this.translocoService.setActiveLang(userPreferredLang.iso6392);
            }

            log('[DEBUG] Get IamService user data from InitializerService');
        }

        log('[DEBUG] InitializerService Initialized');

        return true;
    }

    async resolverInitializer(): Promise<void>
    {
        return;
    }

    private checkEnvironmentSchema(env: Environment): void
    {
        if (!env) throw new Error('Error to load environment properties, current value: ' + env);
        if (!Array.isArray(env.lang.langs) || env.lang.langs.length === 0) throw new Error(`
        You must to define a array with langs application configuration, in environment file, must contains ISO 639-1 code langs.
            lang: {
                base    : 'es',
                fallback: 'es',
                langs   : ['es','en'],
            }
        `);
        if (! env.lang.langs.includes(env.lang.fallback)) throw new Error(`
        You must to define a fallback lang in environment file, must contains ISO 639-1 code lang.
            lang: {
                base    : 'es',
                fallback: 'es',
                langs   : ['es','en'],
            }
        `);
    }
}