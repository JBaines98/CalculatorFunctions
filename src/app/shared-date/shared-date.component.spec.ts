// import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

// import { SharedDateComponent } from './shared-date.component';
// import { of } from 'rxjs';
// import { ThemeService } from '../theme.service';
// import { NO_ERRORS_SCHEMA } from '@angular/core';

// describe('SharedDateComponent', () => {
//   let component: SharedDateComponent;
//   let mockThemeService: ThemeService;
//   let themeName: string;
//   let fixture: ComponentFixture<SharedDateComponent>;

//   beforeEach(() => {
//     themeName = 'business';
//     mockThemeService = jasmine.createSpyObj(['themeChange']);
    
//     spyOn(mockThemeService, 'themeName$').and.returnValue(of('themename'));
    
//     component = new SharedDateComponent(mockThemeService);
//     TestBed.configureTestingModule({
//       declarations: [SharedDateComponent],
//       providers: [
//         {provide: ThemeService, useValue: mockThemeService}
//       ],
//       schemas: [NO_ERRORS_SCHEMA]
//     })
//     fixture = TestBed.createComponent(SharedDateComponent);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('getCurrentDate', () => {
//     it('should retrive the current date time', () => {

//       component.getCurrentDate();
//       let first = component.currentDate;
//       tick(100);
//       component.getCurrentDate();
//       let second = component.currentDate;
//       expect(first !== second);

//     });
//   });

//   describe('ngOnInit', () => {
//     it('should retrieve the current theme from the themeService', () => {

//       mockThemeService.themeChange.and.returnValue(of(themeName))
//       fixture.detectChanges();

//       expect(component.themeName === component.themeService.themeName$)

//     });
//   });

// });


// before each


    // TestBed.configureTestingModule({
    //   declarations: [SharedDateComponent]
    // });
    // fixture = TestBed.createComponent(SharedDateComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
