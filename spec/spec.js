const Routine = require("../index.js");

function wait(sec) {
  return new Promise((resolve) => {
    setTimeout(resolve, sec);
  });
}

describe("routine", function() {
  let counter;

  beforeEach(function() {
    counter = 0;
  });

  it("should exectue in order", function(resolve) {
    let trunk = Routine([
      async function(args, next) {
        expect(counter++).toEqual(0);

        await wait(100);
        await next();

        expect(counter++).toEqual(3);
      },
      function(args, next) {
        expect(counter++).toEqual(1);

        return next().then(function() {
          expect(counter++).toEqual(2);

          return wait(100);
        });
      }
    ]);

    trunk().then(() => {
      expect(counter).toEqual(4);
      resolve()
    });
  });
});
