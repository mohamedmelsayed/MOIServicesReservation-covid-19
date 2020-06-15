import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from "@angular/material/sidenav";

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatGridListModule } from '@angular/material/grid-list';
import {MatRadioModule, MatRadioGroup, MatRadioButton} from "@angular/material/radio";
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
    MatListModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatGridListModule, MatCardModule, MatMenuModule, MatInputModule,
    MatTabsModule, MatChipsModule, MatFormFieldModule, MatGridListModule,
    MatButtonToggleModule, MatDialogModule, MatSliderModule, MatSlideToggleModule,
    MatProgressBarModule, MatOptionModule, MatSelectModule, MatTooltipModule,
    MatExpansionModule, MatCheckboxModule,MatRadioModule, MatAutocompleteModule,MatSnackBarModule, 
    MatDatepickerModule, MatNativeDateModule, MatBadgeModule, MatProgressSpinnerModule
  ],
  exports: [
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
    MatListModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatGridListModule, MatCardModule, MatMenuModule, MatInputModule,
    MatTabsModule, MatChipsModule, MatFormFieldModule, MatGridListModule,
    MatButtonToggleModule, MatDialogModule, MatSliderModule, MatSlideToggleModule,
    MatProgressBarModule, MatOptionModule, MatSelectModule, MatTooltipModule,
    MatExpansionModule,MatCheckboxModule,MatRadioGroup, MatRadioButton,MatAutocompleteModule,MatSnackBarModule,
    MatDatepickerModule,MatNativeDateModule, MatBadgeModule, MatProgressSpinnerModule
  ],
  declarations: [],
 
})
export class MaterialModule { }
