import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Element } from '../elements.store';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-element-pop-up',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './edit-element-pop-up.html',
  styleUrl: './edit-element-pop-up.scss'
})
export class EditElementPopUp {
  data = inject<Element>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<EditElementPopUp>);

  onClose() {
    this.dialogRef.close();
  }
}
