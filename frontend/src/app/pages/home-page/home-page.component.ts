import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="navbar">
      <div class="container" style="display:flex; justify-content:space-between; align-items:center;">
        <strong>CampusFind</strong>
        <nav class="nav-links">
          <a routerLink="/">Home</a>
          <a routerLink="/login">Login</a>
          <a routerLink="/register">Register</a>
          <a routerLink="/dashboard">Dashboard</a>
        </nav>
      </div>
    </header>

    <section class="hero">
      <div class="container">
        <h1>Find what you lost on campus</h1>
        <p>Smart item recovery and matching for KIIT students.</p>
        <div style="display:flex; gap:12px; justify-content:center; margin-top:20px;">
          <a class="btn btn-primary" routerLink="/register">Create account</a>
          <a class="btn btn-secondary" routerLink="/login">Login</a>
        </div>
      </div>
    </section>

    <main class="container" style="padding-top: 32px;">
      <div class="grid grid-2">
        <div class="card">
          <h3>Lost & Found</h3>
          <p>Post missing items, discover likely matches, and report recoveries.</p>
        </div>
        <div class="card">
          <h3>Campus matching</h3>
          <p>Rule-based matching by category, keywords, location, and date.</p>
        </div>
      </div>
    </main>
  `
})
export class HomePageComponent {}
