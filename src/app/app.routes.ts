import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Home } from './home/home';
import { Calculator } from './calculator/calculator';
import { Feedback } from './feedback/feedback';
import { Todo } from './todo/todo';
import { Profile } from './profile/profile';

import { authGuard } from './services/auth.guard';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },


  {
    path: 'login',
    component: Login
  },


  {
    path: 'home',
    component: Home,
    canActivate: [authGuard]
  },


  {
    path: 'calculator',
    component: Calculator,
    canActivate: [authGuard]
  },


  {
    path: 'feedback',
    component: Feedback,
    canActivate: [authGuard]
  },


  {
    path: 'todo',
    component: Todo,
    canActivate: [authGuard]
  },


  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard]
  },


  {
    path: '**',
    redirectTo: 'login'
  }

];