const STATUS = {
  "PENDING": "pending",
  "FULFILLED": "fulfilled",
  "REJECTED": "rejected"
}
//解析x类型，决定promise2走成功还是失败
function resolvePromise(promise2, x, resolve, reject) {
  if (x == promise2) {
      return reject(new TypeError("返回值错误，不能使用同一个promise"))
  }
  //只有object或者function才能是Promise
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
      let called = false;//成功或者失败方法只能调用一次，防止其他Promise实现错误
      try {
          let then = x.then;//通过判断x上是否有then函数，判断x是否是一个Promise
          if (typeof then === 'function') {
              then.call(x, y => {
                  if (called) return;
                  called = true;
                  // resolve(y) y有可能还是promise 递归解析 直到是普通值为止
                  resolvePromise(promise2, y, resolve, reject);
              }, r => {
                  if (called) return;
                  called = true;
                  reject(r);
              })
          } else {
              resolve(x);
          }
      } catch (error) {
          if (called) return;
          called = true;
          reject(error);
      }

  } else {
      resolve(x);
  }
}

class Promise {

  /**
   *  Creates a new Promise.
   *
   *  @param executor — A callback used to initialize the promise. 
   *  This callback is passed two arguments: a resolve callback used to resolve the promise
   *  with a value or the result of another promise, and a reject callback used to reject the 
   *  promise with a provided reason or error.
   */
  constructor(executor) {
      this.status = STATUS.PENDING;
      this.value = undefined;
      this.reason = undefined;
      this.onResolvedCallbacks = [];
      this.onRejectedCallbacks = [];
      const resolve = (value) => {
          if (this.status === STATUS.PENDING) {
              this.status = STATUS.FULFILLED;
              this.value = value;
              this.onResolvedCallbacks.forEach(fn => fn());
          }
      };

      const reject = (reason) => {
          if (this.status === STATUS.PENDING) {
              this.status = STATUS.REJECTED;
              this.reason = reason;
              this.onRejectedCallbacks.forEach(fn => fn());
          }
      };

      try {
          executor(resolve, reject);
      } catch (error) {
          reject(error)
      }
  }
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled — The callback to execute when the Promise is resolved.
   * @param onrejected — The callback to execute when the Promise is rejected.
   * @returns — A Promise for the completion of which ever callback is executed. 
   */
  then(onfulfilled, onrejected) {
      //判断then传递的参数是否是函数，如果不是则包装成一个函数
      onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : x => x;
      onrejected = typeof onrejected === 'function' ? onrejected : error => {
          throw error
      };
      let promise2 = new Promise((resolve, reject) => {
          if (this.status === STATUS.FULFILLED) {
              setTimeout(() => { //创建一个宏任务，保证promise2已完成创建
                  try {
                      let x = onfulfilled(this.value); //x的返回值有可能是一个新的Promise，需要进行判断和处理
                      resolvePromise(promise2, x, resolve, reject);
                  } catch (error) {
                      reject(error) //如果返回异常，捕获并作为失败结果返回
                  }
                  // resolve(x)
              }, 0);

          }
          if (this.status === STATUS.REJECTED) {
              setTimeout(() => {
                  try {
                      let x = onrejected(this.reason);
                      resolvePromise(promise2, x, resolve, reject);
                  } catch (error) {
                      reject(error)
                  }
                  // reject(x)
              }, 0);
          }

          if (this.status === STATUS.PENDING) {
              this.onResolvedCallbacks.push(() => {
                  setTimeout(() => {
                      try {
                          let x = onfulfilled(this.value);
                          resolvePromise(promise2, x, resolve, reject);
                      } catch (error) {
                          reject(error)
                      }
                  }, 0)

              });
              this.onRejectedCallbacks.push(() => {
                  setTimeout(() => {
                      try {
                          let x = onrejected(this.reason);
                          resolvePromise(promise2, x, resolve, reject);
                      } catch (error) {
                          reject(error)
                      }
                  }, 0);
              });
          }
      });
      return promise2;

  }
  catch(errFn) {
      return this.then(null, errFn);
  }
}

Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
  })
  return dfd;
}
module.exports = Promise;

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(12);
  }, 1000);
});
p.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});