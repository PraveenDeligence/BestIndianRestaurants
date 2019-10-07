import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputFormsComponent } from './input-forms/input-forms.component';
import { RestaurantInfoComponent } from './welcome/restaurant-info/restaurant-info.component';
import { UserCommentsComponent } from './welcome/user-comments/user-comments.component';



const routes: Routes = [
  { path: ' ', redirectTo: 'login', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'input-forms', component: InputFormsComponent },
  { path: 'restaurant-info', component: RestaurantInfoComponent },
  { path: 'user-comments', component: UserCommentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
