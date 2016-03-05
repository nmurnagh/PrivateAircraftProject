import { bootstrap } from 'angular2/platform/browser';
import { bind } from 'angular2/core';
import { FORM_PROVIDERS } from 'angular2/common';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { AppComponent } from './app.components';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    FORM_PROVIDERS,
    HTTP_PROVIDERS,
    bind(LocationStrategy).toClass(HashLocationStrategy)
]).then(
    (success:any) => console.log('AppComponent bootstrapped!'),
    (error:any) => console.log(error)
);