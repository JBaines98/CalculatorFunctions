import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowCalculationHistoryComponent } from './show-calculation-history/show-calculation-history.component';

const routes: Routes = [
  {path: 'history', component: ShowCalculationHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
