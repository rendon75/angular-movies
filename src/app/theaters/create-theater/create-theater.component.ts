import { Component } from '@angular/core';
import { TheaterCreationDTO } from '../theaters.models';
import { TheatersFromComponent } from "../theaters-from/theaters-from.component";

@Component({
  selector: 'app-create-theater',
  standalone: true,
  imports: [TheatersFromComponent],
  templateUrl: './create-theater.component.html',
  styleUrl: './create-theater.component.css'
})
export class CreateTheaterComponent {

  saveChanges(theater: TheaterCreationDTO) {
    console.log('creating the theater', theater);
  }
}
