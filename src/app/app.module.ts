import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarComponent } from './menubar/menubar.component';
import { FooterComponent } from './footer/footer.component';
import { LatestMarketComponent } from './latest-market/latest-market.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CrossCurrencyComponent } from './cross-currency/cross-currency.component';
import { MarketTrendsComponent } from './market-trends/market-trends.component';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppFirebaseModule } from './app-firebase/app-firebase.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { environment } from '../environments/environment';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    FooterComponent,
    LatestMarketComponent,
    AboutUsComponent,
    HomeComponent,
    CurrencyConverterComponent,
    CrossCurrencyComponent,
    MarketTrendsComponent,
    UserDashboardComponent,
    UserPreferencesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppFirebaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
