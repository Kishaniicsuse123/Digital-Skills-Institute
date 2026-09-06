// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { HomemenuComponent } from './homemenu/homemenu.component';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, HomemenuComponent],
//   // imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'Digital_Skills_Institute';
// }

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomemenuComponent } from './homemenu/homemenu.component';
import { GridcardComponent } from './gridcard/gridcard.component';
import { ContantComponent } from './contant/contant.component';
import { LoginPageComponent } from './login-page/login-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomemenuComponent, GridcardComponent, ContantComponent, LoginPageComponent],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Digital_Skills_Institute';
  selectedFeature = '';

  selectFeature(feature: string) {
    this.selectedFeature = feature;
  }
 }