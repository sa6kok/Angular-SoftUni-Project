import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { CarouselPauseComponent } from './carousel-pause/carousel-pause.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [NavComponent, FooterComponent, CarouselPauseComponent],
  imports: [
    CommonModule, NgbModule, RouterModule, SharedModule
  ],
  exports: [NavComponent, FooterComponent, CarouselPauseComponent],
  bootstrap: [NavComponent]
})
export class CoreModule { }
