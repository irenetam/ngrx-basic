/* NgRx */
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as ProductActions from './product.action';
import { Product } from 'src/app/models/product.model';

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: [],
    error: ''
};

// Selector functions
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);

///////////////
export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductActions.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProduct: action.product
        };
    }),
    on(ProductActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct: null
        };
    }),
    on(ProductActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct: {
                id: null,
                productName: '',
                productCode: 'New',
                starRating: 0,
                description: ''
            }
        };
    }),
    on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        };
    }),
    on(ProductActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        };
    }),
    // After a create, the currentProduct is the new product.
    on(ProductActions.createProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: [...state.products, action.product],
            currentProduct: action.product,
            error: ''
        };
    }),
    on(ProductActions.createProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    }),
    // After a delete, the currentProduct is null.
    on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: state.products.filter(product => product.id !== action.productId),
            currentProduct: null,
            error: ''
        };
    }),
    on(ProductActions.deleteProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProductActions.updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(
            item => action.product.id === item.id ? action.product : item);
        return {
            ...state,
            products: updatedProducts,
            currentProduct: action.product,
            error: ''
        };
    }),
    on(ProductActions.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    })
);
