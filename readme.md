# promise-routine

A promised base routine that builds up trunks which can be executed in a syncrounized fashion.

## Usage:

```javascript
import * as routine from "@aboutweb/promise-routine";

let trunk = routine([
  /*
    if you don't return a Promise
    and the function itself is not async
    next will get called internally with the same args
  */
  function(ctx) {
    ctx.setup = () => {
      //...
    }
  }
  function(ctx, next) {
    //init...

    return next(ctx).then(() => {
      //bubble up
      ctx.setup();
    });
  },
  async function(ctx, next) {
    ctx.value = true

    await sleep(100);
    await next(ctx);

  }
])

let ctx = {};

trunk(ctx).then((ctx) => {
  //all finised
});

```
