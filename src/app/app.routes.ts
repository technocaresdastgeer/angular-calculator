import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';

/**
 * Defines the routes for the application, including a route for the CalculatorComponent.
 */
export const routes: Routes = [
    {
        path: '',
        component: CalculatorComponent,
        pathMatch: 'full'
    }
];
