import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [CommonModule, FormsModule],
  exports: [LoadingSpinnerComponent, CommonModule],
})
export class SharedModule {}
