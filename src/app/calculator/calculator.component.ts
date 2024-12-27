import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  currentInput = signal('');

  /**
   * Appends a character or operation to the current input.
   * @param value - The value to append.
   */
  appendInput(value: string): void {
    this.currentInput.update((input) => input + value);
  }

  /**
   * Clears the input.
   */
  clear(): void {
    this.currentInput.set('');
  }

  /**
   * Deletes the last character from the current input.
   */
  delete(): void {
    this.currentInput.update((input) => input.slice(0, -1));
  }

  /**
   * Evaluates the current input and updates the display.
   */
  calculate(): void {
    try {
      const result = eval(this.currentInput());
      this.currentInput.set(result.toString());
    } catch (error) {
      this.currentInput.set('Error');
    }
  }
}
