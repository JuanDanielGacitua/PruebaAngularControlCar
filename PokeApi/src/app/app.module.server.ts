import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
export class InputOverviewExample {}
