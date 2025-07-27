import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPetComponent } from './add-pet';

describe('AddPet', () => {
  let component: AddPetComponent;
  let fixture: ComponentFixture<AddPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
