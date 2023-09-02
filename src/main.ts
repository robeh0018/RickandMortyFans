import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideRouter} from "@angular/router";
import {AppRoutes} from "./app/app.routes";
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(AppRoutes),
  ]
})
  .catch(() => console.log);
