import { useEffect } from 'react';
import { usePrevious } from './usePrevious';

export function useRequestSucceed(requestSucceed: boolean, callback: () => void) {
  const prevSignUpSucceed = usePrevious<boolean>(requestSucceed);

  useEffect(() => {
    if (typeof prevSignUpSucceed === 'boolean' && !prevSignUpSucceed && requestSucceed) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestSucceed]);
}
