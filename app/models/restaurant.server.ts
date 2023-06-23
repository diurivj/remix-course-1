import type { Prisma, RestaurantType } from '@prisma/client';
import { db } from '~/utils/db.server';

type CreateRestaurantPayload = {
  name: string;
  foods: string;
  typeId: RestaurantType['id'];
};

export function createRestaurant({
  name,
  foods,
  typeId,
}: CreateRestaurantPayload) {
  return db.restaurant.create({
    data: {
      name,
      rating: 0,
      restaurantTypeId: typeId,
      foods: {
        create: foods.split(',').map((food) => ({
          name: food,
        })),
      },
    },
  });
}

export function getRestaurants(order: string) {
  const [key, value] = order.split('-');

  if (key === 'menu') {
    return db.restaurant.findMany({
      orderBy: {
        foods: {
          _count: value as Prisma.SortOrder,
        },
      },
      include: {
        foods: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  return db.restaurant.findMany({
    orderBy: {
      [key]: value,
    },
    include: {
      foods: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
}
