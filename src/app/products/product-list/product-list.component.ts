import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/models/product.service';
import { Store } from '@ngrx/store';
import { getShowProductCode, getCurrentProduct, ProductState, getProducts } from '../store/product.producer';
import * as ProductActions from '../store/product.action';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    products: Product[];
    products$: Observable<Product[]>;
    selectedProduct$: Observable<Product>;
    displayCode: boolean;
    errorMessage: string;

    constructor(private store: Store<any>, private productService: ProductService) { }

    ngOnInit(): void {
        this.store.dispatch(ProductActions.loadProducts());
        this.products$ = this.store.select(getProducts);
        // this.store.select(getCurrentProduct).subscribe(
        //     currentProduct => this.selectedProduct = currentProduct
        // );
        this.selectedProduct$ = this.store.select(getCurrentProduct);

        // this.productService.getProducts().subscribe({
        //     next: (products: Product[]) => this.products = products,
        //     error: err => this.errorMessage = err
        // });
        this.store.select(getShowProductCode).subscribe(showProductCode => this.displayCode = showProductCode);
    }

    productSelected(product: Product): void {
        // this.store.dispatch(ProductActions.setCurrentProduct({product}));
        this.store.dispatch(ProductActions.setCurrentProduct({ product }));
    }

    checkChanged(): void {
        this.store.dispatch(ProductActions.toggleProductCode());
    }

    newProduct(): void {
        this.store.dispatch(ProductActions.initializeCurrentProduct());
    }
}
