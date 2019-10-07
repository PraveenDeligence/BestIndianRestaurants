import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatPaginatorModule
       } from '@angular/material';
import { AgmCoreModule} from '@agm/core';
import { AuthInterceptor } from './user-interceptor';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestaurantInfoComponent } from './welcome/restaurant-info/restaurant-info.component';
import { UserCommentsComponent } from './welcome/user-comments/user-comments.component';
import { HeaderComponent } from './header/header.component';
import { InputFormsComponent } from './input-forms/input-forms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    DashboardComponent,
    RestaurantInfoComponent,
    UserCommentsComponent,
    HeaderComponent,
    InputFormsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AgmCoreModule.forRoot ({
      apiKey: 'AIzaSyCRhiPbgY6yuQhTmwJQpWI0p55TT-U53YY',
      libraries: ['places']
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
