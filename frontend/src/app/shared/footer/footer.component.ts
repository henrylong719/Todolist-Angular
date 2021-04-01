import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<footer class="mt-3 footer">
    <p>Copyright &#169; HenryLong</p>
  </footer>`,
  styles: [
    `
      .footer {
        padding: 2rem;
        text-align: center;
        width: 100%;
      }
    `,
  ],
})
export class FooterComponent {}
