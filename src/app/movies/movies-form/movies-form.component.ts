import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MovieCreationDTO, MovieDTO } from '../movies.models';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InputImgComponent } from '../../shared/components/input-img/input-img.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/MultipleSelectorDTO';
import { MultipleSelectorComponent } from "../../shared/components/multiple-selector/multiple-selector.component";
import { ActorsAutocompleteComponent } from "../../actors/actors-autocomplete/actors-autocomplete.component";
import { ActorAutoCompleteDTO } from '../../actors/actors.models';

@Component({
  selector: 'app-movies-form',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink,
    MatDatepickerModule, InputImgComponent, MultipleSelectorComponent, ActorsAutocompleteComponent],
  templateUrl: './movies-form.component.html',
  styleUrl: './movies-form.component.css'
})
export class MoviesFormComponent implements OnInit {

  @Input()
  model?: MovieDTO;

  @Output()
  postFormSubmit = new EventEmitter<MovieCreationDTO>();

  @Input({required: true})
  selectedGenres!: MultipleSelectorDTO[];

  @Input({required: true})
  nonSelectedGenres!: MultipleSelectorDTO[];

  @Input({required: true})
  selectedTheaters!: MultipleSelectorDTO[];

  @Input({required: true})
  nonSelectedTheaters!: MultipleSelectorDTO[];

  @Input({required: true})
  selectedActors!: ActorAutoCompleteDTO[];

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    title: ['', {validators: [Validators.required]}],
    releaseDate: new FormControl<Date | null>(null),
    trailer: '',
    poster: new FormControl<File | string | null>(null)
  });

  ngOnInit(): void {
    if (this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  handleFileSelection(file: File): void {
    this.form.controls.poster.setValue(file);
  }

  getErrorMessagesForTitle(): string {
    const field = this.form.controls.title;

    if (field.hasError('required')) {
      return 'The title field is required';
    }

    return '';
  }

  saveChanges(): void {
    const movie = this.form.value as MovieCreationDTO;

    if (movie.releaseDate){
      movie.releaseDate = moment(movie.releaseDate).toDate();
    }

    if (typeof movie.poster === 'string'){
      movie.poster = undefined;
    }

    const genresIds = this.selectedGenres.map(value => value.key);
    movie.genresIds = genresIds;

    const theatersIds = this.selectedTheaters.map(value => value.key);
    movie.theatersIds = theatersIds;

    movie.actors = this.selectedActors;

    this.postFormSubmit.emit(movie);
  }

}
