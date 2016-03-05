import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';
import {Home} from './home/home';

@Component({ 
  selector: 'app-container',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
  { path: '/', as: 'Home', component: Home, useAsDefault: true },
])
export class AppComponent {
  
  constructor() {

  }
  
}