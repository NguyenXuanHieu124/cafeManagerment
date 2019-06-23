import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LauchScreenComponent } from './lauch-screen/lauch-screen.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DetailsComponent } from './details/details.component';
import { DetailRecipeComponent } from './detail-recipe/detail-recipe.component';
import { LayoutComponent } from 'src/@shared/layout/layout.component';
import { AuthGuard } from 'src/@core/auth/auth.guard';


const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: LauchScreenComponent },
  { path: 'on-boarding', component: OnboardingComponent },
  { path: 'auth', loadChildren: './authe/auth.module#AuthModule' },
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', redirectTo: 'table', pathMatch: 'full'
      },
      {
        path: 'table', loadChildren: './_table/table.module#TableModule'
      },
      {
        path: 'order', loadChildren: './_order/order.module#OrderModule'
      },
      {
        path: 'menu', loadChildren: './_menu/menu.module#MenuModule'
      },
      { path:'manager', loadChildren:'./manager/manager.module#ManagerModule'}
    ]
  },
  { path: 'detail/:id', component: DetailsComponent },
  { path: 'detail-recipe/:id', component: DetailRecipeComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
