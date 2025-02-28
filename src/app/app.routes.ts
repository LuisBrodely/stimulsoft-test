import { Routes } from '@angular/router';
import { DesignerComponent } from './components/designer/designer.component';
import { ViewerComponent } from './components/viewer/viewer.component';

export const routes: Routes = [
  { path: 'designer', component: DesignerComponent },
  { path: 'viewer', component: ViewerComponent },
  { path: '', redirectTo: '/viewer', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/designer' }
];