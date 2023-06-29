import * as React from 'react';
import { json, type DataFunctionArgs } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { getRestaurantList } from '~/models/restaurant.server';
import InfiniteScroll from 'react-infinite-scroll-component';

type Restaurants = Awaited<ReturnType<typeof getRestaurantList>>['restaurants'];

const LIMIT = 2 as const;
const DEFAULT_PAGE = 1 as const;

export async function loader({ request }: DataFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || DEFAULT_PAGE;

  const { restaurants, total } = await getRestaurantList({
    limit: LIMIT,
    page: Number(page),
  });

  return json({ restaurants, page: Number(page), total });
}

export default function List() {
  const {
    restaurants: initialRestaurants,
    page,
    total,
  } = useLoaderData<typeof loader>(); // fetch initial data

  const fetcher = useFetcher();

  const [restaurants, setRestaurants] =
    React.useState<Restaurants>(initialRestaurants);

  function loadNext() {
    if (total === restaurants.length) return;

    const nextPage = page + 1;
    fetcher.load(`/list?page=${nextPage}`);
  }

  // An effect for appending data to items state
  React.useEffect(() => {
    if (!fetcher.data || fetcher.state === 'loading') {
      return;
    }

    if (fetcher.data) {
      const newItems = fetcher.data.restaurants;
      setRestaurants((prevAssets) => [...prevAssets, ...newItems]);
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <main className='mx-auto h-full py-20 max-w-7xl sm:px-6 lg:px-8'>
      <h1 className='my-10'>Infinite scroll</h1>

      <InfiniteScroll
        dataLength={restaurants.length}
        next={loadNext}
        hasMore={restaurants.length < total}
        loader={<>Loading..</>}
        height={200}
      >
        {restaurants.map((restaurant) => (
          <p key={restaurant.id} className='text-8xl'>
            {restaurant.name}
          </p>
        ))}
      </InfiniteScroll>
    </main>
  );
}
