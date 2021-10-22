import { AppProps, AppInitialProps } from 'next/app';
import Link from 'next/link';
import { ComponentPropsWithoutRef, forwardRef, Ref, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Pipe from '@/components/Pipe';
import clsx from 'clsx';

function NavAnchorWithoutRef(props: ComponentPropsWithoutRef<'a'>, ref?: Ref<HTMLAnchorElement>) {
  return (
    <a {...props} ref={ref} className={clsx(props.className, 'cursor-pointer hover:underline')} />
  );
}

const NavAnchor = forwardRef(NavAnchorWithoutRef);

function App({ Component, pageProps }: AppInitialProps & AppProps) {
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchIntervalInBackground: false,
        },
      },
    });
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <header className="flex flex-wrap items-center justify-between p-4 bg-blue">
        <Link href="/">
          <NavAnchor>My Restaurant</NavAnchor>
        </Link>
        <div>
          <Link href="/admin" prefetch={false}>
            <NavAnchor>Admin</NavAnchor>
          </Link>
          <Pipe />
          <Link href="/basket" prefetch={false}>
            <NavAnchor>Basket</NavAnchor>
          </Link>
        </div>
      </header>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;
