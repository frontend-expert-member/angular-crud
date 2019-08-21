import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { AppService } from './app.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule, ReactiveFormsModule ],
  declarations: [ AppComponent ],
  providers: [ AppService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
