let initCount = 8100;

// ----------------- Callback Functions -----------------

const onSuccess = (updatedCount: number) => {
  console.log("increment count by database query", updatedCount);
};

const onFail = (failedCount: number) => {
  console.log("count is invalid", failedCount);
};

// ---------------------- Promises ----------------------

const incrementCountPromise = (count: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (count < 0) {
        reject(count);
      }

      resolve(++count);
    }, 1000);
  });
};

incrementCountPromise(initCount).then(onSuccess).catch(onFail);

// ------------------------------------------------------

//=======================================================

// ---------------------- Callback ----------------------

const incrementCountCallBack = (count: number, onSuccess: (updatedCount: number) => void, onFail: (failedCount: number) => void) => {
  setTimeout(() => {
    if (count < 0) {
      onFail(count);
    } else {
      onSuccess(++count);
    }
  }, 1000);
};

incrementCountCallBack(initCount, onSuccess, onFail);

// ------------------------------------------------------

//=======================================================

// -------------------- Async / Await -------------------
const incrementCountAwait = async (count: number) => {
  try {
    const finalValue = await incrementCountPromise(count);
    console.log("increment count by database query", finalValue);
  } catch (negativeValue) {
    console.log("count is invalid", negativeValue);
  }
};

incrementCountAwait(initCount);

// ------------------------------------------------------
