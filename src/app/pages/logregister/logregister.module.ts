import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogregisterPageRoutingModule } from './logregister-routing.module';

import { LogregisterPage } from './logregister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    LogregisterPageRoutingModule
  ],
  declarations: [LogregisterPage]
})
export class LogregisterPageModule { }
