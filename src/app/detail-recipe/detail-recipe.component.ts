import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-recipe',
  templateUrl: './detail-recipe.component.html',
  styleUrls: ['./detail-recipe.component.scss']
})
export class DetailRecipeComponent implements OnInit {

  constructor(
    private title: Title
  ) {
    this.title.setTitle('DETAIL-RECIPE');
   }

  ngOnInit() {
  }

}
