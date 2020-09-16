import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductService } from 'src/app/models/product.service';
import { Product } from 'src/app/models/product.model';
import { NumberValidators } from '../../shared/number.validator';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { Store } from '@ngrx/store';
import { ProductState, getCurrentProduct } from '../store/product.producer';
import * as ProductActions from '../store/product.action';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
    productForm: FormGroup;

    // product: Product | null;
    product$: Observable<Product | null>;
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    errorMessage = '';
    pageTitle = '';

    constructor(private store: Store<ProductState>, private fb: FormBuilder, private productService: ProductService) {
        this.validationMessages = {
            productName: {
                required: 'Product name is required.',
                minLength: 'Product name must be at least three characters.',
                maxLength: 'Product name can not exceed 50 characters'
            },
            productCode: {
                required: 'Product code is required.'
            },
            starRating: {
                range: 'Rate the product between 1(lowest) and 5(highest).'
            }
        };
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.productForm = this.fb.group({
            productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            productCode: ['', [Validators.required]],
            starRating: [0, NumberValidators.range(1, 5)],
            description: ''
        });
        // this.store.select(getCurrentProduct).subscribe(
        //     currentProduct => this.displayProduct(currentProduct)
        // );
        this.product$ = this.store.select(getCurrentProduct).pipe(
            tap(product => this.displayProduct(product))
        );
        this.productForm.valueChanges.subscribe(() => {
            this.displayMessage = this.genericValidator.processMessages(this.productForm);
            console.log(this.displayMessage);
        });
    }

    displayProduct(product: Product): void {
        // this.product = product;
        if (product) {
            if (product.id) {
                this.pageTitle = 'Add Product';
            } else {
                this.pageTitle = `Edit Product: ${product.productName}`;
            }

            this.productForm.patchValue({
                productName: product.productName,
                productCode: product.productCode,
                starRating: product.starRating,
                description: product.description
            });
        }
    }

    saveProduct(originalProduct: Product): void {
        if (this.productForm.valid) {
            if (this.productForm.dirty) {
                const product = { ...originalProduct, ...this.productForm.value };
                console.log(product);
                if (!product.id) {
                    this.store.dispatch(ProductActions.createProduct({product}));
                    // this.productService.createProduct(product).subscribe({
                    //     next: p => this.productService.changeSelectedProduct(p),
                    //     error: err => this.errorMessage = err
                    // });
                } else {
                    this.store.dispatch(ProductActions.updateProduct({product}));
                    // this.productService.updateProduct(product).subscribe({
                    //     next: p => this.productService.changeSelectedProduct(p),
                    //     error: err => this.errorMessage = err
                    // });
                }
            }
        }
    }

    blur(): void {
        this.displayMessage = this.genericValidator.processMessages(this.productForm);
    }

    cancelEdit(product: Product): void {
        this.displayProduct(product);
    }

    deleteProduct(product: Product): void {
        if (product && product.id) {
            if (confirm(`Really delete the product: ${product.productName}?`)) {
                // this.productService.deleteProduct(product.id).subscribe({
                //     next: () => this.store.dispatch(ProductActions.clearCurrentProduct()),
                //     error: err => this.errorMessage = err
                // });
                this.store.dispatch(ProductActions.deleteProduct({ productId: product.id}));
            }
        } else {
            this.store.dispatch(ProductActions.clearCurrentProduct());
        }
    }
}
