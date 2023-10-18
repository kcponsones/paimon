import { useEffect, useReducer, useRef } from "react";
import { getRandomInt } from "../getRandomNumber";

let waitController: AbortController | undefined;

function wait(ms: number, options: { signal?: AbortSignal } = {}) {
    const { signal } = options;
  
    return new Promise<void>((resolve, reject) => {
      // FIXME Not supported by Jest 29.3.1 + Node.js 19.3.0
      //signal?.throwIfAborted();
      if (signal?.aborted) reject(signal.reason);
  
      const id = setTimeout(() => {
        resolve();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        signal?.removeEventListener('abort', abort);
      }, ms);
  
      function abort() {
        clearTimeout(id);
        reject(signal!.reason);
      }
  
      signal?.addEventListener('abort', abort);
    });
}

export function useProgressbar({
    trickleMaxWidth = 94,
    trickleIncrementMin = 1,
    trickleIncrementMax = 5,
    dropMinSpeed = 50,
    dropMaxSpeed = 150,
    transitionSpeed = 600
  } = {}){
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const widthRef = useRef(0);

    useEffect(() => {
        return () => {
          waitController?.abort();
        };
      }, []);

    const setWidth  = (width: number) => {
        widthRef.current = width;
        forceUpdate();
    }

    const start = async() => {
        waitController?.abort();
        waitController = new AbortController();

         // Force the show the JSX
        setWidth(1);
        await wait(0);

        await trickle();
    }

    const reset = () => {
        waitController?.abort();
        setWidth(0);
    }

    const complete = async() => {
        setWidth(100);
        try {
            await wait(transitionSpeed, { signal: waitController?.signal });
            setWidth(0);
        } catch {
        // Current loop aborted: a new route has been started
        }
    }

    const trickle = async() => {
        if (widthRef.current < trickleMaxWidth) {
            const inc = widthRef.current + getRandomInt(trickleIncrementMin, trickleIncrementMax);
            setWidth(inc);
            try {
              await wait(getRandomInt(dropMinSpeed, dropMaxSpeed),  {
                signal: waitController!.signal
              });
              await trickle();
            } catch {
              // Current loop aborted: a new route has been started
            }
        } 
    }
    

    return {
        start,
        complete,
        reset,
        width: widthRef.current
      };


}