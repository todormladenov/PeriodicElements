import { Component } from '@angular/core';
import { ElementsTable } from "./elements/elements-table/elements-table";

@Component({
  selector: 'app-root',
  imports: [ElementsTable],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'PeriodicElements';
}
