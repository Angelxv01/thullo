import {Document} from 'mongoose';

type Compose<T, K> = T & K;
export type ComposeMongooseModel<T> = Compose<T, Document>;
