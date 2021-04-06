import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [CommonModule, AppRoutingModule, FormsModule],
})
export class SharedModule {}
