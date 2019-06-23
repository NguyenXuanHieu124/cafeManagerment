import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LauchScreenComponent } from './lauch-screen/lauch-screen.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DetailsComponent } from './details/details.component';
import { DetailRecipeComponent } from './detail-recipe/detail-recipe.component';
import { SharedModule } from 'src/@shared/shared.module';
import { HttpInterceptorService } from 'src/@core/config/http-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    LauchScreenComponent,
    OnboardingComponent,
    NotfoundComponent,
    DetailsComponent,
    DetailRecipeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
