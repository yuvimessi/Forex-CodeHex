import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LatestMarketComponent } from './latest-market/latest-market.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CrossCurrencyComponent } from './cross-currency/cross-currency.component';
import { MarketTrendsComponent } from './market-trends/market-trends.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { UserGuardGuard } from './user-guard.guard';



const routes: Routes = [

  {path: "**", redirectTo: "/home"},
  {path: "home", component: HomeComponent},
  {path: "latest-market", component: LatestMarketComponent},
  {path: "currency-converter", component: CurrencyConverterComponent},
  {path: "cross-currency", component: CrossCurrencyComponent},
  {path: "market-trends", component: MarketTrendsComponent},
  {path: "about-us", component: AboutUsComponent},
  {path: "user-dashboard", component: UserDashboardComponent, canActivate:[UserGuardGuard]},
  {path: "user-preferences", component: UserPreferencesComponent, canActivate:[UserGuardGuard]}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
