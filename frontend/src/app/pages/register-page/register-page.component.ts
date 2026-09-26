import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="container" style="max-width:500px; padding-top:80px;">
      <div class="card">
        <h2>Register</h2>

        <form>
          <div class="form-group">
            <label for="name">Full name</label>
            <input id="name" type="text" name="name" placeholder="Student Name" />
          </div>

          <div class="form-group">
            <label for="email">KIIT email</label>
            <input id="email" type="email" name="email" placeholder="name@kiit.ac.in" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" name="password" placeholder="••••••••" />
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm password</label>
            <input id="confirmPassword" type="password" name="confirmPassword" placeholder="••••••••" />
          </div>

          <button class="btn btn-primary" type="submit">Create account</button>
        </form>

        <p style="margin-top:16px;">
          Already registered? <a routerLink="/login">Login</a>
        </p>
      </div>
    </div>
  `
})
export class RegisterPageComponent {}
