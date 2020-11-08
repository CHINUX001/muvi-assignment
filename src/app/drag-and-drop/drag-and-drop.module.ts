import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragAndDropComponent} from "./drag-and-drop.component";
import {DragAndDropRouting} from "./drag-and-drop.routing";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [DragAndDropComponent],
  imports: [
    CommonModule,
    DragAndDropRouting,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DragAndDropModule {}
