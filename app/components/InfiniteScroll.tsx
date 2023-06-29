import * as React from 'react';

type InfiniteScrollProps = {
  children: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[];
  loadNext: () => void;
  loading: boolean;
  offsetPercentage?: number;
};

export function InfiniteScroll({
  children,
  loadNext,
  loading,
  offsetPercentage = 0.6,
}: InfiniteScrollProps) {
  const scrollListener = React.useRef(loadNext);
  const childrenRef = React.useRef(children);

  React.useEffect(() => {
    scrollListener.current = loadNext;
  }, [loadNext]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
    };

    function onScroll() {
      const documentHeight = document.documentElement.scrollHeight;
      const offset = documentHeight * offsetPercentage; // Calculate the new offset
      const scrollDifference = Math.floor(window.innerHeight + window.scrollY);
      const scrollEnded = scrollDifference >= offset;

      console.log({ scrollEnded, loading });

      if (scrollEnded && !loading) {
        scrollListener.current();
      }
    }
  }, [loading, offsetPercentage]);

  return <>{children}</>;
}
