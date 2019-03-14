import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface State extends fromRoot.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

// line 17 - 31, building selectors for each state slices.
const getProductFeatureState = createFeatureSelector<ProductState>('products'); // products is defined in product.module.

// must be in order of references.
export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProduct.id
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) =>
    state.products.find(p => p.id === currentProductId)
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);



// declare initial state.
const initialState: ProductState = {
    showProductCode: false,
    currentProduct: null,
    products: []
};

export function reducer(state = initialState, action): ProductState {
    switch (action.type) {
        case 'TOGGLE_PRODUCT_CODE':
            console.log(JSON.stringify(state));
            console.log(action.payload);
            return {
                ...state, // copying exisiting state
                showProductCode: action.payload
            };

        default:
            return state;
    }
}
