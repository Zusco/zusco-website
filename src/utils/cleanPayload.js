const cleanPayload = (payload) => {
  Object.keys(payload).forEach((key) => {
    if (
      (!payload[key] || payload[key] === {}) &&
      payload[key] !== false &&
      payload[key] !== 0
    ) {
      delete payload[key];
    }
  });
  return payload;
};

export const checkPayloadEmptyField = (payload) => {
  let emptyFieldFound = false;
  Object.keys(payload).forEach((key) => {
    if (
      (!payload[key] ||
        payload[key] === {} ||
        (typeof payload[key] === "string" &&
          payload[key]?.includes("undefined"))) &&
      payload[key] !== false &&
      payload[key] !== 0 &&
      !key?.includes("Image")
    ) {
      emptyFieldFound = true;
    }
  });
  return emptyFieldFound;
};
export default cleanPayload;
