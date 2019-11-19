import { ADD_PRODUCTS } from '../constands/actionTypes';

export function addProducts(text) {
    return { type: ADD_PRODUCTS, text}
}