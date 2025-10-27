import { Component } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent {

  setUpTabs = ["General", "Concepts", "Features", "Preview"];
  selectedTab = 0;

  selectTab(index: number){
    this.selectedTab = index;
  }

}
