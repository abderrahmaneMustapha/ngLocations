import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DxDrawerComponent, DxDrawerModule, DxListModule } from 'devextreme-angular';
import { ConfigService } from 'src/app/config/config.service';
import { DataService } from 'src/app/core/service/data.service';
import { NavService } from 'src/app/core/service/nav.service';

import { SideNavComponent } from './side-nav.component';
import { SideNavService } from './side-nav.service';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let service: SideNavService
  let fixture: ComponentFixture<SideNavComponent>;
  let navLinks;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, DxDrawerModule, DxListModule],
      providers: [ConfigService, DataService, NavService, SideNavService],
      declarations: [SideNavComponent]
    })
    .compileComponents();

    service = new SideNavService()
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('count navigation links', () => {
    fixture.detectChanges()
    navLinks = fixture.nativeElement.querySelectorAll('.dx-theme-text-color')
    expect(navLinks.length).toBe(service.getNavigationList().length)
  })

  it('side nav bar should hide', () => {
    component.isDrawerOpen = false
    fixture.detectChanges()
    let drawer = fixture.debugElement.query(By.css('dx-drawer'));
    expect(drawer.attributes['ng-reflect-opened']).toBe('false')
  })
});
