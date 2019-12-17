import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { CardRationComponent } from './card-ration/card-ration.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { CardBeverageComponent } from './card-beverage/card-beverage.component';
import { RationOrderedComponent } from './ration-ordered/ration-ordered.component';
import { BeverageOrderedComponent } from './beverage-ordered/beverage-ordered.component';
import { FooterComponent } from './footer/footer.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ToastComponent } from './toast/toast.component';
import { MakesureComponent } from './makesure/makesure.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    CardRationComponent,
    ImageViewComponent,
    MyOrderComponent,
    CardBeverageComponent,
    RationOrderedComponent,
    BeverageOrderedComponent,
    FooterComponent,
    DeliveryComponent,
    IntroductionComponent,
    HomeComponent,
    AboutComponent,
    ToastComponent,
    MakesureComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule, HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
