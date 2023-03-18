class MyPromise {
  constructor(executor) {
    this.state = "PENDING";
    this.value = null;
    this.reson = null;
    this.onFufilledCallbacks = [];
    this.onRejectCallbacks = [];

    let resolve = (data) => {
      if (this.state === "PENDING") {
        this.state = "FULFILLED";
        this.value = data;
        this.onFufilledCallbacks.forEach((fn) => {
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
  then(fulfilledCallback, rejectCallback) {
    fulfilledCallback =
      typeof fulfilledCallback === "function"
        ? fulfilledCallback
        : (data) => data;
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
            let x = fulfilledCallback(this.value);
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
        this.onFufilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = fulfilledCallback(this.value);
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
    this.then(null, rejectCallback);
    return;
  }
  finally(callback) {
    return this.then(
      (value) => {
        return MyPromise.resolve(callback()).then(() => value);
      },
      (reson) => {
        return MyPromise.resolve(callback()).then(() => {
          throw reson;
        });
      }
    );
  }
  static resolve(data) {
    let p = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolvePromise(p, data, resolve, reject);
      }, 0);
    });
    return p;
  }
  static reject(err) {
    let p = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        reject(err);
      }, 0);
    });
    return p;
  }
  static all(promiseArr) {
    if (!isIterator(promiseArr)) {
      throw TypeError(promiseArr + "不是一个可迭代对象");
    }
    let resuleArr = [],
      count = 0,
      promiseItem = null;
    return new MyPromise((resolve, reject) => {
      if (promiseArr.length === 0) {
        return resolve([]);
      }
      for (let i = 0; i < promiseArr.length; i++) {
        promiseItem = promiseArr[i];
        if (isPromise(promiseItem)) {
          promiseItem.then(
            (res) => {
              setResultArrIdx(res, i, resolve);
            },
            (err) => {
              reject(err);
            }
          );
        } else {
          setResultArrIdx(promiseItem, i, resolve);
        }
      }
    });
    function setResultArrIdx(value, index, resolve) {
      resuleArr[index] = value;
      count++;
      if (count === promiseArr.length) {
        resolve(resuleArr);
      }
    }
  }
  static race(promiseArr) {
    if (
      promiseArr === null ||
      promiseArr === undefined ||
      typeof promiseArr[Symbol.iterator] !== "function"
    ) {
      throw TypeError(promiseArr + "不是一个可迭代对象");
    }
    return new MyPromise((resolve, reject) => {
      let promiseItem = null;
      for (let i = 0; i < promiseArr.length; i++) {
        promiseItem = promiseArr[i];
        if (isPromise(promiseItem)) {
          promiseItem.then(
            (res) => resolve(res),
            (err) => reject(err)
          );
        } else {
          resolve(promiseItem);
        }
      }
    });
  }
  static allSettled(promiseArr) {
    if (!isIterator(promiseArr)) {
      throw TypeError(promiseArr + "不是一个可迭代对象");
    }
    let resuleArr = [],
      count = 0,
      promiseItem = null;
    return new MyPromise((resolve) => {
      if (promiseArr.length === 0) {
        return resolve([]);
      }
      for (let i = 0; i < promiseArr.length; i++) {
        promiseItem = promiseArr[i];
        if (isPromise(promiseItem)) {
          promiseItem.then(
            (res) => {
              setResultArrIdx("fulfilled", res, i, resolve);
            },
            (err) => {
              setResultArrIdx("rejected", err, i, resolve);
            }
          );
        } else {
          setResultArrIdx("fulfilled", promiseItem, i, resolve);
        }
      }
    });
    function setResultArrIdx(status, value, index, resolve) {
      if (status === "fulfilled") {
        resuleArr[index] = { status, value };
      } else if (status === "rejected") {
        resuleArr[index] = { status, reson: value };
      }
      count++;
      if (count === promiseArr.length) {
        resolve(resuleArr);
      }
    }
  }
  static any(promiseArr) {
    if (!isIterator(promiseArr)) {
      throw TypeError(promiseArr + "不是一个可迭代对象");
    }
    return new MyPromise((resolve, reject) => {
      let promiseItem = null,
        errCount = 0;
      for (let i = 0; i < promiseArr.length; i++) {
        promiseItem = promiseArr[i];
        if (isPromise(promiseItem)) {
          promiseItem.then(
            (res) => {
              resolve(res);
            },
            (err) => {
              if (++errCount === promiseArr.length) {
                reject(
                  new AggregateError(
                    [new Error("some error")],
                    "No Promise in Promise.any was resolved"
                  )
                );
              }
            }
          );
        } else {
          resolve(promiseItem);
        }
      }
    });
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
function isPromise(value) {
  return value instanceof MyPromise;
}
function isIterator(value) {
  return (
    value !== null &&
    value !== undefined &&
    typeof value[Symbol.iterator] === "function"
  );
}

// MyPromise.deferred = function () {
//   let dfd = {};
//   dfd.promise = new MyPromise((resolve, reject) => {
//     dfd.resolve = resolve;
//     dfd.reject = reject;
//   });
//   return dfd;
// };
// module.exports = MyPromise;

// let p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject(12);
//   }, 1000);
// });
// p.then(res => {
//   console.log(res)
// })
// .catch((err) => {
//     console.log('catch')
//     console.log(err);
//   });
// let p1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("45566666");
//   }, 2000);
// });
// let p2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject("46666");
//   }, 1000);
// });
// MyPromise.allSettled([p1, 1, p2, 3, 4])
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {});

// MyPromise.reject("222")
//   .finally(() => {
//     return new MyPromise((resolve, reject) => {
//       setTimeout(() => {
//         reject("456");
//       }, 1000);
//     });
//   })
//   .then((res) => {
//     console.log("then：" + res);
//   })
//   .catch((err) => {
//     console.log("catch：" + err);
//   });

let p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("45566666");
  }, 2000);
});
let p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("46666");
  }, 1000);
});
MyPromise.any([p1, p2])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
