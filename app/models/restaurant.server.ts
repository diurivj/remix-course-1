import type { Prisma, RestaurantType } from '@prisma/client';
import { db } from '~/utils/db.server';

type CreateRestaurantPayload = {
  name: string;
  foods: string;
  typeId: RestaurantType['id'];
};

type UpdateRestaurantRatingPayload = {
  restaurantId: RestaurantType['id'];
  rating: number;
};

type GetRestaurantListPayload = {
  page: number;
  limit: number;
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

export function getRestaurantById(id: RestaurantType['id']) {
  return db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      type: true,
      comments: {
        select: {
          creator: true,
          text: true,
          id: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
      foods: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
}

export function updateRestaurantRating({
  restaurantId: id,
  rating,
}: UpdateRestaurantRatingPayload) {
  return db.restaurant.update({
    where: {
      id,
    },
    data: {
      rating: {
        increment: rating,
      },
      visitors: {
        increment: 1,
      },
    },
  });
}

export async function getChefsRecommendation() {
  // create a function that delays time
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // delay 2 seconds
  await delay(3000);

  return db.restaurant.findMany({
    orderBy: {
      rating: 'desc',
    },
    take: 3,
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

export async function getRestaurantList({
  page,
  limit,
}: GetRestaurantListPayload) {
  // page = 1, limit = 10 -> id 1 -> 10
  // page = 2, limit = 10 -> id 11 -> 20

  // return the total amount of restaurants
  const total = await db.restaurant.count();
  const restaurants = await db.restaurant.findMany({
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    total,
    restaurants,
  };
}
