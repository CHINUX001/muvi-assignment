import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'drag-drop',
    pathMatch: 'full'
  },
  {
    path: 'drag-drop',
    loadChildren: () => import('./drag-and-drop/drag-and-drop.module').then(m => m.DragAndDropModule),
  },
  {
    path: '**',
    redirectTo: 'drag-drop',
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
