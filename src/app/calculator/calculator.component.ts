import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
 // Signals to store calculator state
 currentInput = signal('0');
 previousInput = signal('');
 operation = signal('');

 // Function to handle number and dot inputs
 appendNumber(number: string) {
   if (this.currentInput() === '0' && number !== '.') {
     this.currentInput.set(number);
   } else {
     this.currentInput.set(this.currentInput() + number);
   }
 }

 // Function to handle operator selection
 chooseOperation(operator: string) {
   if (this.currentInput() === '') return;
   if (this.previousInput() !== '') {
     this.compute();
   }
   this.operation.set(operator);
   this.previousInput.set(this.currentInput());
   this.currentInput.set('');
 }

 // Function to perform computation
 compute() {
   let computation: number;
   const prev = parseFloat(this.previousInput());
   const curr = parseFloat(this.currentInput());

   if (isNaN(prev) || isNaN(curr)) return;

   switch (this.operation()) {
     case '+':
       computation = prev + curr;
       break;
     case '-':
       computation = prev - curr;
       break;
     case '*':
       computation = prev * curr;
       break;
     case '/':
       computation = prev / curr;
       break;
     default:
       return;
   }

   this.currentInput.set(computation.toString());
   this.operation.set('');
   this.previousInput.set('');
 }

 // Function to clear the inputs
 clear() {
   this.currentInput.set('0');
   this.previousInput.set('');
   this.operation.set('');
 }

 // Function to delete the last entered digit
 delete() {
   this.currentInput.set(this.currentInput().slice(0, -1) || '0');
 }
}
