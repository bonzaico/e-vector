/* @flow */

  declare type __CurriedFunction1<A, R, AA: A> =
    & ((...r: [AA]) => R)
  declare type CurriedFunction1<A, R> = __CurriedFunction1<A, R, *>

  declare type __CurriedFunction2<A, B, R, AA: A, BB: B> =
    & ((...r: [AA]) => CurriedFunction1<BB, R>)
    & ((...r: [AA, BB]) => R)
  declare type CurriedFunction2<A, B, R> = __CurriedFunction2<A, B, R, *, *>

  declare type __CurriedFunction3<A, B, C, R, AA: A, BB: B, CC: C> =
    & ((...r: [AA]) => CurriedFunction2<BB, CC, R>)
    & ((...r: [AA, BB]) => CurriedFunction1<CC, R>)
    & ((...r: [AA, BB, CC]) => R)
  declare type CurriedFunction3<A, B, C, R> = __CurriedFunction3<A, B, C, R, *, *, *>

  declare type __CurriedFunction4<A, B, C, D, R, AA: A, BB: B, CC: C, DD: D> =
    & ((...r: [AA]) => CurriedFunction3<BB, CC, DD, R>)
    & ((...r: [AA, BB]) => CurriedFunction2<CC, DD, R>)
    & ((...r: [AA, BB, CC]) => CurriedFunction1<DD, R>)
    & ((...r: [AA, BB, CC, DD]) => R)
  declare type CurriedFunction4<A, B, C, D, R> = __CurriedFunction4<A, B, C, D, R, *, *, *, *>

  declare type __CurriedFunction5<A, B, C, D, E, R, AA: A, BB: B, CC: C, DD: D, EE: E> =
    & ((...r: [AA]) => CurriedFunction4<BB, CC, DD, EE, R>)
    & ((...r: [AA, BB]) => CurriedFunction3<CC, DD, EE, R>)
    & ((...r: [AA, BB, CC]) => CurriedFunction2<DD, EE, R>)
    & ((...r: [AA, BB, CC, DD]) => CurriedFunction1<EE, R>)
    & ((...r: [AA, BB, CC, DD, EE]) => R)
  declare type CurriedFunction5<A, B, C, D, E, R> = __CurriedFunction5<A, B, C, D, E, R, *, *, *, *, *>

  declare type __CurriedFunction6<A, B, C, D, E, F, R, AA: A, BB: B, CC: C, DD: D, EE: E, FF: F> =
    & ((...r: [AA]) => CurriedFunction5<BB, CC, DD, EE, FF, R>)
    & ((...r: [AA, BB]) => CurriedFunction4<CC, DD, EE, FF, R>)
    & ((...r: [AA, BB, CC]) => CurriedFunction3<DD, EE, FF, R>)
    & ((...r: [AA, BB, CC, DD]) => CurriedFunction2<EE, FF, R>)
    & ((...r: [AA, BB, CC, DD, EE]) => CurriedFunction1<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF]) => R)
  declare type CurriedFunction6<A, B, C, D, E, F, R> = __CurriedFunction6<A, B, C, D, E, F, R, *, *, *, *, *, *>

  declare type __CurriedFunction7<A, B, C, D, E, F, G, R, AA: A, BB: B, CC: C, DD: D, EE: E, FF: F, GG: G> =
    & ((...r: [AA]) => CurriedFunction6<BB, CC, DD, EE, FF, R>)
    & ((...r: [AA, BB]) => CurriedFunction5<CC, DD, EE, FF, R>)
    & ((...r: [AA, BB, CC]) => CurriedFunction4<DD, EE, FF, R>)
    & ((...r: [AA, BB, CC, DD]) => CurriedFunction3<EE, FF, R>)
    & ((...r: [AA, BB, CC, DD, EE]) => CurriedFunction2<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF]) => CurriedFunction1<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF, GG]) => R)
  declare type CurriedFunction7<A, B, C, D, E, F, G, R> = __CurriedFunction7<A, B, C, D, E, F, G, R, *, *, *, *, *, *>

  declare type __CurriedFunction8<A, B, C, D, E, F, G, H, R, AA: A, BB: B, CC: C, DD: D, EE: E, FF: F, GG: G, HH: H> =
    & ((...r: [AA]) => CurriedFunction7<BB, CC, DD, EE, FF, R>)
    & ((...r: [AA, BB]) => CurriedFunction6<CC, DD, EE, FF, R>)
    & ((...r: [AA, BB, CC]) => CurriedFunction5<DD, EE, FF, R>)
    & ((...r: [AA, BB, CC, DD]) => CurriedFunction4<EE, FF, R>)
    & ((...r: [AA, BB, CC, DD, EE]) => CurriedFunction3<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF]) => CurriedFunction2<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF, GG]) => CurriedFunction1<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF, GG, HH]) => R)
  declare type CurriedFunction8<A, B, C, D, E, F, G, H, R> = __CurriedFunction8<A, B, C, D, E, F, G, H, R, *, *, *, *, *, *>

  declare type __CurriedFunction9<A, B, C, D, E, F, G, H, I, R, AA: A, BB: B, CC: C, DD: D, EE: E, FF: F, GG: G, HH: H, II: I> =
    & ((...r: [AA]) => CurriedFunction8<BB, CC, DD, EE, FF, R>)
    & ((...r: [AA, BB]) => CurriedFunction7<CC, DD, EE, FF, R>)
    & ((...r: [AA, BB, CC]) => CurriedFunction6<DD, EE, FF, R>)
    & ((...r: [AA, BB, CC, DD]) => CurriedFunction5<EE, FF, R>)
    & ((...r: [AA, BB, CC, DD, EE]) => CurriedFunction4<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF]) => CurriedFunction3<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF, GG]) => CurriedFunction2<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF, GG, HH]) => CurriedFunction1<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF, GG, HH, II]) => R)
  declare type CurriedFunction9<A, B, C, D, E, F, G, H, I, R> = __CurriedFunction9<A, B, C, D, E, F, G, H, I, R, *, *, *, *, *, *>

  declare type __CurriedFunction10<A, B, C, D, E, F, H, I, J, R, AA: A, BB: B, CC: C, DD: D, EE: E, FF: F, GG: G, HH: H, II: I, JJ: J> =
    & ((...r: [AA]) => CurriedFunction9<BB, CC, DD, EE, FF, R>)
    & ((...r: [AA, BB]) => CurriedFunction8<CC, DD, EE, FF, R>)
    & ((...r: [AA, BB, CC]) => CurriedFunction7<DD, EE, FF, R>)
    & ((...r: [AA, BB, CC, DD]) => CurriedFunction6<EE, FF, R>)
    & ((...r: [AA, BB, CC, DD, EE]) => CurriedFunction5<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF]) => CurriedFunction4<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF, GG]) => CurriedFunction3<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF, GG, HH]) => CurriedFunction2<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF, GG, HH, II]) => CurriedFunction1<FF, R>)
    & ((...r: [AA, BB, CC, DD, EE, FF, GG, HH, II, JJ]) => R)
  declare type CurriedFunction10<A, B, C, D, E, F, G, H, I, J, R> = __CurriedFunction10<A, B, C, D, E, F, G, H, I, J, R, *, *, *, *, *, *>

  declare type Curry =
    & (<A, R>((...r: [A]) => R) => CurriedFunction1<A, R>)
    & (<A, B, R>((...r: [A, B]) => R) => CurriedFunction2<A, B, R>)
    & (<A, B, C, R>((...r: [A, B, C]) => R) => CurriedFunction3<A, B, C, R>)
    & (<A, B, C, D, R>((...r: [A, B, C, D]) => R) => CurriedFunction4<A, B, C, D, R>)
    & (<A, B, C, D, E, R>((...r: [A, B, C, D, E]) => R) => CurriedFunction5<A, B, C, D, E, R>)
    & (<A, B, C, D, E, F, R>((...r: [A, B, C, D, E, F]) => R) => CurriedFunction6<A, B, C, D, E, F, R>)

const curry = (fn) => {
    return function resolve() {
        var that = this;
        var args = Array.prototype.slice.apply(arguments);
        if (args.length < fn.length) {
            return function next() {
                var currArgs = Array.prototype.slice.apply(arguments);
                if (args.length + currArgs.length >= fn.length) {
                    return fn.apply(that, args.concat(currArgs));
                }

                if (args.length + currArgs.length < fn.length) {
                    return resolve.apply(that, args.concat(currArgs));
                }
            };
        } else {
            return fn.apply(that, args);
        }
    }
}

export default {
    curry
};