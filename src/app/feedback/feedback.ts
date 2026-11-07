import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  imports: [FormsModule],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css'
})
export class Feedback {

  name = '';

  email = '';

  category = '';

  rating = 0;

  feedbackText = '';

  submitted = false;

  errorMessage = '';

  feedbackHistory: string[] = [];


  stars = [1, 2, 3, 4, 5];


  setRating(value: number): void {

    this.rating = value;

  }


  getRatingText(): string {

    switch (this.rating) {

      case 1:
        return 'Very Bad 😞';

      case 2:
        return 'Needs Improvement 😕';

      case 3:
        return 'Average 😐';

      case 4:
        return 'Good 🙂';

      case 5:
        return 'Excellent 😍';

      default:
        return 'Select a rating';

    }

  }


  submitFeedback(): void {

    this.errorMessage = '';

    this.submitted = false;


    if (
      this.name.trim() === '' ||
      this.email.trim() === '' ||
      this.category === '' ||
      this.rating === 0 ||
      this.feedbackText.trim() === ''
    ) {

      this.errorMessage =
        'Please complete all fields before submitting.';

      return;

    }


    if (!this.email.includes('@')) {

      this.errorMessage =
        'Please enter a valid email address.';

      return;

    }


    this.feedbackHistory.unshift(

      `${this.name} • ${this.rating}/5 • ${this.category}`

    );


    this.submitted = true;

  }


  resetForm(): void {

    this.name = '';

    this.email = '';

    this.category = '';

    this.rating = 0;

    this.feedbackText = '';

    this.submitted = false;

    this.errorMessage = '';

  }

}