// import { Component, Output, EventEmitter } from '@angular/core';
// import { RouterModule } from '@angular/router';
// @Component({
//   selector: 'app-header',
  
//   standalone: true,
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css',
  
// })
// export class HeaderComponent
// {
//   @Output() featureSelected = new EventEmitter<string>();

//   selectFeature(feature: string) {
//     this.featureSelected.emit(feature);
//   }
// }

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

}