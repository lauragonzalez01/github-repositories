import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-handler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-handler.component.html',
  styleUrl: './error-handler.component.scss'
})
export class ErrorHandlerComponent {
  @Input() errorMessage: string = '';
}
