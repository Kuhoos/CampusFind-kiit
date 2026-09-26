import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="container" style="max-width:500px; padding-top:80px;">
      <div class="card">
        <h2>Login</h2>

        <form>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" name="email" placeholder="name@kiit.ac.in" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" name="password" placeholder="••••••••" />
          </div>

          <button class="btn btn-primary" type="submit">Login</button>
        </form>

        <p style="margin-top:16px;">
          Need an account? <a routerLink="/register">Register</a>
        </p>
      </div>
    </div>
  `
})
export class LoginPageComponent {}
