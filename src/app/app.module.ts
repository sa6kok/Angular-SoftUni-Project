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
import { ngxUiLoaderConfig } from './shared/config/ng-x-loader-config';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { AppInterceptor } from './interceptors/app-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { toastrConfig } from './shared/config/toastr-cofig';
import { httpLoaderConfig } from './shared/config/ng-x-http-loader-config';
import { routingLoaderConfig } from './shared/config/ng-x-routing-loader-config';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(toastrConfig),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule.forRoot(routingLoaderConfig),
    NgxUiLoaderHttpModule.forRoot(httpLoaderConfig),
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
