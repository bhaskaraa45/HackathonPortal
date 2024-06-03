'use client';

import { useEffect } from 'react';
import { redirectToAuth } from 'supertokens-auth-react';
import SuperTokens from 'supertokens-auth-react/ui';
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui';
import Session from 'supertokens-auth-react/recipe/session';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Auth() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const redirectTo = searchParams?.get('redirectTo');
    console.log(redirectTo)

    const checkSessionAndRedirect = async () => {
      if (SuperTokens.canHandleRoute([ThirdPartyPreBuiltUI]) === false) {
        redirectToAuth({ redirectBack: true, queryParams: { redirectTo: redirectTo } });
      } 
      // else {
      //   const sessionExists = await Session.doesSessionExist();
      //   if (sessionExists) {
      //     if (redirectTo) {
      //       router.replace(redirectTo);
      //     }
      //   }
      // }
    };

    checkSessionAndRedirect();
  }, [searchParams, router]);

  if (typeof window !== 'undefined') {
    return SuperTokens.getRoutingComponent([ThirdPartyPreBuiltUI]);
  }

  return null;
}
