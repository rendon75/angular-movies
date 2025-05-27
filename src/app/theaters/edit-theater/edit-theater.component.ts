import { Component, Input, numberAttribute } from '@angular/core';
import { TheaterCreationDTO, TheaterDTO } from '../theaters.models';
import { TheatersFromComponent } from "../theaters-from/theaters-from.component";

@Component({
  selector: 'app-edit-theater',
  standalone: true,
  imports: [TheatersFromComponent],
  templateUrl: './edit-theater.component.html',
  styleUrl: './edit-theater.component.css'
})
export class EditTheaterComponent {

  @Input({transform: numberAttribute})
    id!: number;

  model: TheaterDTO = { id: 1, name: 'Acropolis', latitude: 33.019365, longitude: -96.694920 };

  saveChanges(theater: TheaterCreationDTO) {
    console.log('editing the theater', theater);
  }
}
