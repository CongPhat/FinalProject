import { createStore } from 'redux';

import products from '../reducers/products';

const store = createStore(products);

export default store;