import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as ProductActions from '../store/product.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/models/product.service';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions, private productService: ProductService) { }

    loadProducts$ = createEffect(() =>
    {
        return this.actions$
            .pipe(
                ofType(ProductActions.loadProducts),
                switchMap(() => this.productService.getProducts()
                    .pipe(
                        map(products => ProductActions.loadProductsSuccess({ products })),
                        catchError(error => of(ProductActions.loadProductsFailure({ error })))
                    )
                )
            );
    });

    updateProduct$ = createEffect(() =>
    {
        return this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            switchMap(action => this.productService.updateProduct(action.product)
                .pipe(
                    map(product => ProductActions.updateProductSuccess({ product })),
                    catchError(error => of(ProductActions.updateProductFailure({ error })))
                )
            )
        );
    });

    createProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.createProduct),
            switchMap(action => this.productService.createProduct(action.product)
                .pipe(
                    map(product => ProductActions.createProductSuccess({ product })),
                    catchError(error => of(ProductActions.createProductFailure({ error })))
                )
            )
        );
    });

    deleteProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.deleteProduct),
            switchMap(action => this.productService.deleteProduct(action.productId)
                .pipe(
                    map(productId => ProductActions.deleteProductSuccess({ productId: action.productId })),
                    catchError(error => of(ProductActions.deleteProductFailure({ error })))
                )
            )
        );
    });
}
