import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestMarketComponent } from './latest-market.component';

describe('LatestMarketComponent', () => {
  let component: LatestMarketComponent;
  let fixture: ComponentFixture<LatestMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestMarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
