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
  { path: 'auth', loadChildren: () => import('./authe/auth.module').then(m => m.AuthModule) },
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', redirectTo: 'table', pathMatch: 'full'
      },
      {
        path: 'table', loadChildren: () => import('./_table/table.module').then(m => m.TableModule)
      },
      {
        path: 'order', loadChildren: () => import('./_order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'menu', loadChildren: () => import('./_menu/menu.module').then(m => m.MenuModule)
      },
      { path:'manager', loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule)}
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
