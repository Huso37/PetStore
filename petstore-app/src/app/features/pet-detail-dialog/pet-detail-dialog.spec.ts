import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDetailDialogComponent } from './pet-detail-dialog';

describe('PetDetailDialog', () => {
  let component: PetDetailDialogComponent;
  let fixture: ComponentFixture<PetDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
