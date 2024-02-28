import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConverterComponent } from './currency-converter.component';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyConverterComponent]
    });
    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should asign Dollar values to exchangedValue, currencyIcon, exchangeRate and currency', () => {
    expect(component.exchangedValue).toEqual(component.sterlingValue * 1.27);
    expect(component.currencyIcon).toEqual('fa-solid fa-dollar-sign');
    expect(component.exchangeRate).toEqual(1.27);
    expect(component.currency).toEqual('Dollar');
    expect(component.saveCurrencyClicked(1.27, 'Dollar'));
  });

  it('should asign Euro values to exchangedValue, currencyIcon, exchangedRate and currency', () => {
    expect(component.exchangedValue).toEqual(component.sterlingValue * 1.16);
    expect(component.currencyIcon).toEqual('fa-solid fa-euro-sign');
    expect(component.exchangeRate).toEqual(1.16);
    expect(component.currency).toEqual('Euro');
    expect(component.saveCurrencyClicked(1.16, 'Euro'));
  });

  it('should asign Yen values to exchangedValue, currencyIcon, exchangedRate and currency', () => {
    expect(component.exchangedValue).toEqual(component.sterlingValue * 183.45);
    expect(component.currencyIcon).toEqual('fa-solid fa-yen-sign');
    expect(component.exchangeRate).toEqual(183.45);
    expect(component.currency).toEqual('Yen');
    expect(component.saveCurrencyClicked(183.45, 'Yen'));
  });

  it('should asign Won values to exchangedValue, currencyIcon, exchangedRate and currency', () => {
    expect(component.exchangedValue).toEqual(component.sterlingValue * 1679.12);
    expect(component.currencyIcon).toEqual('fa-solid fa-won-sign');
    expect(component.exchangeRate).toEqual(1679.12);
    expect(component.currency).toEqual('Won');
    expect(component.saveCurrencyClicked(1679.12, 'Won'));
  });

  it('should asign Peso values to exchangedValue, currencyIcon, exchangedRate and currency', () => {
    expect(component.exchangedValue).toEqual(component.sterlingValue * 21.48);
    expect(component.currencyIcon).toEqual('fa-solid fa-peso-sign');
    expect(component.exchangeRate).toEqual(21.48);
    expect(component.currency).toEqual('Peso');
    expect(component.saveCurrencyClicked(21.48, 'Peso'));
  });

  it('should reverte values back to a clear stage', () => {
    expect(component.sterlingValue).toEqual(0);
    expect(component.exchangedValue).toEqual(0);
    expect(component.exchangeRate).toEqual(0);
    expect(component.currencyIcon).toEqual('fa-solid fa-sterling-sign');
    expect(component.currency).toEqual('');
  });

});
