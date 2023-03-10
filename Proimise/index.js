class MyPromise {
  constructor(executor) {
    this.state = "PENDING";
    this.value = null;
    this.reson = null;
    this.onResolveCallbacks = [];
    this.onRejectCallbacks = [];

    let resolve = (data) => {
      if (this.state === "PENDING") {
        this.state = "FULFILLED";
        this.value = data;
        this.onResolveCallbacks.forEach((fn) => {
          fn();
        });
      }
    };
    let reject = (data) => {
      if (this.state === "PENDING") {
        this.state = "REJECTED";
        this.reson = data;
        this.onRejectCallbacks.forEach((fn) => {
          fn();
        });
      }
    };
    executor(resolve, reject);
  }
  then(resolveCallback, rejectCallback) {
    resolveCallback =
      typeof resolveCallback === "function" ? resolveCallback : (data) => data;
    rejectCallback =
      typeof rejectCallback === "function"
        ? rejectCallback
        : (err) => {
            throw err;
          };

    let p2 = new MyPromise((resolve, reject) => {
      if (this.state === "FULFILLED") {
        setTimeout(() => {
          try {
            let x = resolveCallback(this.value);
            resolvePromise(p2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.state === "REJECTED") {
        setTimeout(() => {
          try {
            let x = rejectCallback(this.reson);
            resolvePromise(p2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.state === "PENDING") {
        this.onResolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = resolveCallback(this.value);
              resolvePromise(p2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = rejectCallback(this.reson);
              resolvePromise(p2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
    return p2;
  }
  catch(rejectCallback) {
    return this.then(null, rejectCallback);
  }
}
function resolvePromise(p2, x, resolve, reject) {
  if (p2 === x) {
    throw reject(new TypeError("不能返回同一个promise对象"));
  }
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let called = false;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (value) => {
            if (called) return;
            called = true;
            resolvePromise(p2, value, resolve, reject);
          },
          (err) => {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        resolve(x);
      }
    } catch (err) {
      if (called) return;
      called = true;
      reject(err);
    }
  } else {
    resolve(x);
  }
}

MyPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
module.exports = MyPromise;

// let p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject(12);
//   }, 1000);
// });
// p.then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// });
