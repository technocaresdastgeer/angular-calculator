import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
   // Signals for calculator state
   currentInput = signal('0');
   history = signal<string[]>([]);
 
   // Append number or operator
   appendInput(value: string) {
     if (this.currentInput() === '0' && !isNaN(parseFloat(value))) {
       this.currentInput.set(value);
     } else {
       this.currentInput.set(this.currentInput() + value);
     }
   }
 
   // Handle clear
   clear() {
     this.currentInput.set('0');
   }
 
   // Handle backspace
   delete() {
     this.currentInput.set(
       this.currentInput().slice(0, -1) || '0'
     );
   }
 
   // Compute the result
   compute() {
     try {
       // Evaluate safely
       const result = eval(this.currentInput());
       this.history.update((h) => [...h, `${this.currentInput()} = ${result}`]);
       this.currentInput.set(result.toString());
     } catch (error) {
       this.currentInput.set('Error');
     }
   }
}
