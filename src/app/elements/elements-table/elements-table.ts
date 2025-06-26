import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EditElementPopUp } from "../edit-element-pop-up/edit-element-pop-up";
import { MatDialog } from '@angular/material/dialog';
import { Element, ElementsStore } from '../elements.store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-elements-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './elements-table.html',
  styleUrl: './elements-table.scss'
})
export class ElementsTable implements OnInit, OnDestroy {
  readonly store = inject(ElementsStore);
  private dialog = inject(MatDialog);
  private destroy$: Subject<void> = new Subject();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = new MatTableDataSource<Element>([]);

  filterControl = new FormControl('');

  constructor() {
    effect(() => {
      this.dataSource.data = this.store.elements();
    });

    this.filterControl.valueChanges
      .pipe(
        tap(() => this.store.setLoadingState(true)),
        debounceTime(2000),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.store.setLoadingState(false);
        this.dataSource.filter = value || ''
      }
      )
  }

  ngOnInit(): void {
    this.store.loadAll();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openEdit(element: Element) {
    const dialogRef = this.dialog.open(EditElementPopUp, {
      data: { ...element }
    })

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {

        if (result !== undefined) {
          this.store.updateElement(result);
        }
      })
  }
}
