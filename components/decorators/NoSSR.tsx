import dynamic from 'next/dynamic';
import React from 'react';

export const NoSSR = dynamic(
   () =>
      Promise.resolve((props: React.PropsWithChildren) => (
         <React.Fragment>{props.children}</React.Fragment>
      )),
   {
      ssr: false,
   }
);
