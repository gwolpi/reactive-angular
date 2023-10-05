import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ReactiveAppComponent } from './app/reactive-app.component';
import {ImperativeAppComponent} from "./app/imperative-app.component";

/* Imperative App */
bootstrapApplication(ImperativeAppComponent, appConfig)
  .catch((err) => console.error(err));

/* Reactive App */
// bootstrapApplication(ReactiveAppComponent, appConfig)
// 	.catch((err) => console.error(err));
