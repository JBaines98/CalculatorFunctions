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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
