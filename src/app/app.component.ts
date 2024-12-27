import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScientificCalculatorComponent } from './scientific-calculator/scientific-calculator.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ScientificCalculatorComponent, CalculatorComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isScientificMode = signal(false); // Toggle between simple and scientific calculators
  isDarkMode = signal(false);

  toggleDarkMode() {
    this.isDarkMode.set(!this.isDarkMode());
  }
  
  toggleCalculatorMode() {
    this.isScientificMode.set(!this.isScientificMode());
  }
}
