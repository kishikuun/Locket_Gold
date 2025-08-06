const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
let obj = JSON.parse($response.body);

obj.Attention = "Thành công!";

const subscriptionInfo = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-04-12T01:04:18Z",
  purchase_date: "2024-04-12T01:04:17Z",
  store: "app_store"
};

const entitlementInfo = {
  grace_period_expires_date: null,
  purchase_date: "2024-04-12T01:04:17Z",
  product_identifier: "com.locket02.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

const matchedKey = Object.keys(mapping).find(key => ua.includes(key));

if (matchedKey) {
  const [entitlementName, productID] = mapping[matchedKey];
  if (productID) {
    entitlementInfo.product_identifier = productID;
    obj.subscriber.subscriptions[productID] = subscriptionInfo;
  } else {
    obj.subscriber.subscriptions["com.locket02.premium.yearly"] = subscriptionInfo;
  }
  obj.subscriber.entitlements[entitlementName] = entitlementInfo;
} else {
  obj.subscriber.subscriptions["com.locket02.premium.yearly"] = subscriptionInfo;
  obj.subscriber.entitlements.pro = entitlementInfo;
}

$done({ body: JSON.stringify(obj) });
