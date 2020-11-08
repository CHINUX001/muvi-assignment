import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DragAndDropComponent} from "./drag-and-drop.component";

const routes: Routes = [
  {
    path: '',
    component: DragAndDropComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DragAndDropRouting {}
