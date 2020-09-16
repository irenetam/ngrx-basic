import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductService } from './models/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productReducer } from './products/store/product.producer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './products/store/product.effects';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ products: productReducer }),
    EffectsModule.forRoot([ProductEffects]),
    StoreDevtoolsModule.instrument({})
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {}
