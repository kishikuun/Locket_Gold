const setHeaderValue = (headers, key, value) => {
  const lowerKey = key.toLowerCase();
  if (lowerKey in headers) {
    headers[lowerKey] = value;
  } else {
    headers[key] = value;
  }
};

setHeaderValue($request.headers, "X-RevenueCat-ETag", "");
$done({ headers: $request.headers });
