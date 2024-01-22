import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumberButtonComponent } from './number-button/number-button.component';
import { FunctionButtonComponent } from './function-button/function-button.component';
import { DisplayResultComponent } from './display-result/display-result.component';
import { SumHistoryComponent } from './sum-history/sum-history.component';
import { MemoryComponent } from './memory/memory.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { TrigonometryComponent } from './trigonometry/trigonometry.component';
import { LengthConverterComponent } from './length-converter/length-converter.component';
import { WeightConverterComponent } from './weight-converter/weight-converter.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { VolumeConverterComponent } from './volume-converter/volume-converter.component';
import { FoodEnergyConverterComponent } from './food-energy-converter/food-energy-converter.component';
import { SpeedConverterComponent } from './speed-converter/speed-converter.component';
import { IconDisplayerComponent } from './icon-displayer/icon-displayer.component';
import { TemperatureConverterComponent } from './temperature-converter/temperature-converter.component';
import { PressureComponent } from './pressure/pressure.component';


@NgModule({
  declarations: [
    AppComponent,
    NumberButtonComponent,
    FunctionButtonComponent,
    DisplayResultComponent,
    SumHistoryComponent,
    MemoryComponent,
    CurrencyConverterComponent,
    TrigonometryComponent,
    LengthConverterComponent,
    WeightConverterComponent,
    DateTimeComponent,
    VolumeConverterComponent,
    FoodEnergyConverterComponent,
    SpeedConverterComponent,
    IconDisplayerComponent,
    TemperatureConverterComponent,
    PressureComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
