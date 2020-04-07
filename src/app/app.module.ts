import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ReservationModule } from './reservation/reservation.module';
import { UserModule } from './user/user.module';
import { PropertyModule } from './property/property.module';
import { HomeModule } from './home/home.module';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ngxUiLoaderConfig } from './shared/ng-x-config/ng-x-loader-config';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { AppInterceptor } from './interceptors/app-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule.forRoot({ showForeground: false }),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    NgbModule,
    CoreModule,
    ReservationModule,
    UserModule,
    PropertyModule,
    HomeModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
