import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarHComponent } from "./widgets/navbar-h/navbar-h.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarHComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RFID';
}
