import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DxButtonModule, DxToolbarModule } from 'devextreme-angular';
import { ConfigService } from 'src/app/config/config.service';
import { DataService } from 'src/app/core/service/data.service';
import { NavService } from 'src/app/core/service/nav.service';

import { TopNavComponent } from './top-nav.component';

describe('TopNavComponent', () => {
  let component: TopNavComponent
  let service: NavService
  let fixture: ComponentFixture<TopNavComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, DxToolbarModule, DxButtonModule],
      providers: [ConfigService, DataService, NavService],
      declarations: [ TopNavComponent ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(TopNavComponent)
    service = new NavService()
    component = fixture.componentInstance
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('test close and open on button click', () => {
    let element: HTMLElement = fixture.nativeElement;
    let html5Button = element.querySelector("dx-button-normal") as HTMLElement;
    html5Button?.click();
    fixture.detectChanges();
    expect(service.isDrawerOpen).toBe(true)
  })
});
