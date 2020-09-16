import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

export const toggleProductCode = createAction(
    '[Product] Toggle Product Code'
);

export const setCurrentProduct = createAction(
    '[Product] Set Current Product',
    props<{ product: Product }>()
);

export const clearCurrentProduct = createAction(
    '[Product] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
    '[Product] Initialize Current Product'
);

export const loadProducts = createAction(
    '[Product] Load'
);

export const loadProductsSuccess = createAction(
    '[Product] Load Success',
    props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
    '[Product] Load Fail',
    props<{ error: string }>()
);

export const createProduct = createAction(
    '[Product] Create',
    props<{ product: Product}>()
);

export const createProductSuccess = createAction(
    '[Product] Create Success',
    props<{ product: Product}>()
);

export const createProductFailure = createAction(
    '[Product] Create Fail',
    props<{ error: string }>()
);

export const updateProduct = createAction(
    '[Product] update',
    props<{ product: Product}>()
);

export const updateProductSuccess = createAction(
    '[Product] update Success',
    props<{ product: Product}>()
);

export const updateProductFailure = createAction(
    '[Product] update Fail',
    props<{ error: string}>()
);

export const deleteProduct = createAction(
    '[Product] delete',
    props<{ productId: string}>()
);

export const deleteProductSuccess = createAction(
    '[Product] delete Success',
    props<{ productId: string}>()
);

export const deleteProductFailure = createAction(
    '[Product] delete Fail',
    props<{ error: string}>()
);
