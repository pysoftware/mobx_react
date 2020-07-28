import {types} from 'mobx-state-tree';

export const WishListItem = types.model({
  name: types.string,
  price: types.number,
  image: types.optional(types.string, ''),
}).actions(self => ({
  setName(newName) {
    self.name = newName;
  },
  setPrice(newPrice) {
    self.price = newPrice;
  },
  setImage(newImage) {
    self.image = newImage;
  },
}));

export const WishList = types.model({
  wishItems: types.optional(types.array(WishListItem), []),
}).actions(self => ({
  addWish(wish) {
    self.wishItems.push(wish);
  },
})).views(self => ({
  get totalPrice() {
    return self.wishItems.reduce((sum, wish) => sum + wish.price, 0);
  },
}));
