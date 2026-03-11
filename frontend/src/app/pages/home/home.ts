import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true
})
export class HomeComponent implements OnInit {
  heroImageError = false;
  // You can add component logic here
  // For example, data fetching or state management

  constructor() { }

  ngOnInit(): void {
    // Initialize any data or services here
  }

  // Example method for button click
  navigateToRegister(): void {
    // Navigation logic would go here
    console.log('Navigate to registration page');
  }
}