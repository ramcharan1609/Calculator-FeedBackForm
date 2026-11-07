import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css'
})
export class Calculator {

  display = '0';

  firstNumber: number | null = null;
  operator = '';

  waitingForSecondNumber = false;
  expression = '';

  history: string[] = [];

  // =========================
  // NUMBER BUTTONS
  // =========================

  addNumber(number: string): void {

    if (this.display === 'Error' || this.display.includes('=')) {
      this.clear();
    }

    if (this.waitingForSecondNumber) {
      this.display = number;
      this.waitingForSecondNumber = false;
      return;
    }

    if (this.display === '0') {
      this.display = number;
    } else {
      this.display += number;
    }
  }

  // =========================
  // DECIMAL
  // =========================

  addDecimal(): void {

    if (this.display === 'Error' || this.display.includes('=')) {
      this.clear();
    }

    if (this.waitingForSecondNumber) {
      this.display = '0.';
      this.waitingForSecondNumber = false;
      return;
    }

    if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

  // =========================
  // OPERATORS
  // =========================

  chooseOperator(operator: string): void {

    if (this.display === 'Error') {
      this.clear();
      return;
    }

    // Prevent multiple operators
    if (this.firstNumber !== null) {
      return;
    }

    this.firstNumber = Number(this.display);
    this.operator = operator;

    this.expression =
      this.formatNumber(this.firstNumber) +
      ' ' +
      this.getSymbol(operator);

    this.display = this.expression;

    this.waitingForSecondNumber = true;
  }

  getSymbol(operator: string): string {

    switch (operator) {

      case '*':
        return '×';

      case '/':
        return '÷';

      case '-':
        return '−';

      case '+':
        return '+';

      default:
        return operator;
    }
  }

  // =========================
  // CALCULATE
  // =========================

  calculate(): void {

    if (
      this.firstNumber === null ||
      this.operator === ''
    ) {
      return;
    }

    let secondNumber: number;

    if (this.waitingForSecondNumber) {
      return;
    }

    // Get second number from display
    secondNumber = Number(this.display);

    let result = 0;

    switch (this.operator) {

      case '+':

        result = this.firstNumber + secondNumber;
        break;

      case '-':

        result = this.firstNumber - secondNumber;
        break;

      case '*':

        result = this.firstNumber * secondNumber;
        break;

      case '/':

        if (secondNumber === 0) {

          this.display = 'Error';
          this.firstNumber = null;
          this.operator = '';
          this.expression = '';

          return;
        }

        result = this.firstNumber / secondNumber;
        break;
    }

    const formattedFirst =
      this.formatNumber(this.firstNumber);

    const formattedSecond =
      this.formatNumber(secondNumber);

    const formattedResult =
      this.formatResult(result);

    const fullExpression =
      `${formattedFirst} ${this.getSymbol(this.operator)} ${formattedSecond} = ${formattedResult}`;

    // Show complete expression in display
    this.display = fullExpression;

    // Add to history
    this.history.unshift(fullExpression);

    // Keep only last 5
    if (this.history.length > 5) {
      this.history.pop();
    }

    this.firstNumber = null;
    this.operator = '';
    this.expression = '';
    this.waitingForSecondNumber = false;
  }

  // =========================
  // RESULT FORMATTING
  // =========================

  formatResult(value: number): string {

    if (!Number.isFinite(value)) {
      return 'Error';
    }

    // Show maximum 6 decimal places.
    // Truncates instead of showing a long decimal.
    const factor = 1000000;

    const truncated =
      Math.trunc(value * factor) / factor;

    return truncated.toString();
  }

  formatNumber(value: number): string {

    return value.toString();
  }

  // =========================
  // CLEAR
  // =========================

  clear(): void {

    this.display = '0';

    this.firstNumber = null;

    this.operator = '';

    this.waitingForSecondNumber = false;

    this.expression = '';
  }

  // =========================
  // DELETE / BACKSPACE
  // =========================

  delete(): void {

    if (
      this.display === 'Error' ||
      this.display.includes('=')
    ) {
      this.clear();
      return;
    }

    if (this.waitingForSecondNumber) {
      return;
    }

    if (this.display.length <= 1) {

      this.display = '0';

    } else {

      this.display =
        this.display.slice(0, -1);
    }
  }

  // =========================
  // PERCENTAGE
  // =========================

  percentage(): void {

    if (
      this.display === 'Error' ||
      this.display.includes('=')
    ) {
      return;
    }

    const value = Number(this.display);

    if (!Number.isNaN(value)) {

      this.display =
        this.formatResult(value / 100);
    }
  }

  // =========================
  // KEYBOARD SUPPORT
  // =========================

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {

    const key = event.key;

    // Numbers 0-9
    if (/^[0-9]$/.test(key)) {

      event.preventDefault();

      this.addNumber(key);

      return;
    }

    // Decimal
    if (key === '.') {

      event.preventDefault();

      this.addDecimal();

      return;
    }

    // Operators
    if (
      key === '+' ||
      key === '-' ||
      key === '*' ||
      key === '/'
    ) {

      event.preventDefault();

      this.chooseOperator(key);

      return;
    }

    // Enter or =
    if (key === 'Enter' || key === '=') {

      event.preventDefault();

      this.calculate();

      return;
    }

    // Backspace
    if (key === 'Backspace') {

      event.preventDefault();

      this.delete();

      return;
    }

    // Escape = AC
    if (key === 'Escape') {

      event.preventDefault();

      this.clear();

      return;
    }

    // Percentage
    if (key === '%') {

      event.preventDefault();

      this.percentage();

      return;
    }
  }
}