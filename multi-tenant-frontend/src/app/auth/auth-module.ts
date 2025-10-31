import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';


@NgModule({
  imports: [Login,Register, CommonModule, ReactiveFormsModule, FormsModule, AuthRoutingModule],
})
export class AuthModule { }
