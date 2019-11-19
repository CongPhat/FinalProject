import { ADD_PRODUCTS } from '../constands/actionTypes';

let stateProduct = [];

function products(state = stateProduct, action) {
    if (action.type === ADD_PRODUCTS) {
        console.log('text');
    }
    return state;
}

export default products;