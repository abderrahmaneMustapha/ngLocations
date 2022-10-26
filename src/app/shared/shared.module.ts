import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './component/top-nav/top-nav.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { DxToolbarModule, DxDrawerModule, DxListModule, DxBoxModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TopNavComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    DxToolbarModule,
    DxDrawerModule,
    DxListModule,
    RouterModule,
    DxBoxModule
  ],
  exports : [
    TopNavComponent,
    SideNavComponent
  ],
})
export class SharedModule { }
