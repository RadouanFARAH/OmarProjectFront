import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUserPageRoutingModule } from './add-user-routing.module';

import { AddUserPage } from './add-user.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'


@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    AddUserPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [AddUserPage]
})
export class AddUserPageModule { }
