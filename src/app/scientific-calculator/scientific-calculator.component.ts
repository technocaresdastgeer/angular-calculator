import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-scientific-calculator',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './scientific-calculator.component.html',
  styleUrl: './scientific-calculator.component.css'
})
export class ScientificCalculatorComponent {
   // Signals for inputs and history
   currentInput = signal('');
   calculationHistory = signal<string[]>([]);
 
   /**
    * Appends a character or operation to the current input.
    * @param value - The value to append.
    */
   appendInput(value: string): void {
     if (value === '=') {
       this.calculate();
       return;
     }
     this.currentInput.update((input) => input + value); // Correct usage of 'update' method
   }
 
   /**
    * Clears all input and resets the calculator.
    */
   clear(): void {
     this.currentInput.set(''); // Correct usage of 'set' to reset signal
   }
 
   /**
    * Deletes the last character from the current input.
    */
   delete(): void {
     this.currentInput.update((input) => input.slice(0, -1)); // Correct usage of 'update' method
   }
 
   /**
    * Evaluates the current input and updates the history.
    */
   calculate(): void {
     try {
       const result = this.evaluateExpression(this.currentInput());
       this.calculationHistory.update((history) => [
         ...history,
         `${this.currentInput()} = ${result}`
       ]);
       this.currentInput.set(result.toString());
     } catch (error) {
       this.currentInput.set('Error');
     }
   }
 
   /**
    * Evaluates a mathematical expression.
    * @param expression - The expression to evaluate.
    * @returns The result of the expression.
    */
   private evaluateExpression(expression: string): number {
     // Replace common constants and functions
     const sanitizedExpression = expression
       .replace(/π/g, Math.PI.toString())
       .replace(/e/g, Math.E.toString())
       .replace(/sqrt\(/g, 'Math.sqrt(')
       .replace(/sin\(/g, 'Math.sin(')
       .replace(/cos\(/g, 'Math.cos(')
       .replace(/tan\(/g, 'Math.tan(')
       .replace(/log\(/g, 'Math.log(')
       .replace(/\^/g, '**'); // Support for exponentiation
 
     // Use the JavaScript `eval` function for quick evaluation (caution: sanitize input)
     return eval(sanitizedExpression);
   }
 
   /**
    * Returns the last 3 calculations from history.
    */
   history(): string {
     return this.calculationHistory().slice(-3).join('\n');
   }
}
