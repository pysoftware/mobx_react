import {WishList, WishListItem} from './WishList';
import {getSnapshot} from 'mobx-state-tree';

it('should create instance', function() {
  const item = WishListItem.create({
    name: 'TestMilk',
    price: 50,
    image: 'uri',
  });

  expect(item.price).toBe(50);
  item.setName('Milk');
  expect(item.name).toBe('Milk');
});

it('should create a wish list', function() {
  const list = WishList.create({
    wishItems: [
      {
        name: 'test',
        price: 10,
      },
      {
        name: 'test',
        price: 10,
      },
    ],
  });

  expect(list.wishItems.length).toBe(2);
});

it('should add new wish', function() {
  const list = WishList.create();

  list.addWish({
    name: 'TEST',
    price: 30,
  });

  expect(list.wishItems.length).toBe(1);

  expect(getSnapshot(list)).toEqual({
    wishItems: [
      {
        name: 'TEST',
        price: 30,
        image: ""
      }],
  });
});