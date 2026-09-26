import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  template: `
    <header class="navbar">
      <div class="container" style="display:flex; justify-content:space-between; align-items:center;">
        <strong>CampusFind</strong>
        <nav class="nav-links">
          <a routerLink="/">Home</a>
          <a routerLink="/dashboard">Dashboard</a>
        </nav>
      </div>
    </header>

    <main class="container">
      <div class="card">
        <h2>Dashboard</h2>
        <p>Search, filters, item cards, potential matches, and resolution workflow.</p>

        <div class="grid grid-2" style="margin-top:24px;">
          <div class="card">
            <h3>Lost Items</h3>
            <ul>
              <li>Black backpack</li>
              <li>Red power bank</li>
              <li>White wallet</li>
            </ul>
          </div>

          <div class="card">
            <h3>Found Items</h3>
            <ul>
              <li>Blue umbrella</li>
              <li>Silver keychain</li>
              <li>Green laptop sleeve</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  `,
  imports: []
})
export class DashboardPageComponent {}
