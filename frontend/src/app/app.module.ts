import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';

import { HeaderComponent } from './shared/header/header.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CoreModule } from './core.module';
@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    AdminModule,
    CoreModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
