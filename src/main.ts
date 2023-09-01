import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideRouter} from "@angular/router";
import {AppRoutes} from "./app/app.routes";
import {provideHttpClient} from "@angular/common/http";


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(AppRoutes),
  ]
})
  .catch(() => console.log);
