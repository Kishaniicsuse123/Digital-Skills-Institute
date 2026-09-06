// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-contant',
//   imports: [],
//   templateUrl: './contant.component.html',
//   styleUrl: './contant.component.css'
// })
// export class ContantComponent {
//   selectedFeature = '';

//   selectFeature(feature: string) {
//     this.selectedFeature = feature;
//   }
  
// }

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contant.component.html',
  styleUrls: ['./contant.component.css']
})
export class ContantComponent {
  @Input() selectedFeature!: string;
}