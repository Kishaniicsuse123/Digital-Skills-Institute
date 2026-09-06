// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-homemenu',
//   standalone: true,
//   templateUrl: './homemenu.component.html',
//   styleUrl: './homemenu.component.css'
// })
// export class HomemenuComponent 
// {
//    isOpen = false;
//   @Output() featureSelected = new EventEmitter<string>();

//   selectFeature(feature: string) 
//   {
//     this.featureSelected.emit(feature);
  
//   }
// }

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-homemenu',
  standalone: true,
  templateUrl: './homemenu.component.html',
  styleUrls: ['./homemenu.component.css']
})
export class HomemenuComponent {
  isOpen = false;

  @Output() featureSelected = new EventEmitter<string>();

  selectFeature(feature: string) {
    this.featureSelected.emit(feature);
  }
}