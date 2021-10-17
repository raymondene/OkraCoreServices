//company ID: 484929849
//customer ID: 573839293

import fetch from "node-fetch";

async function fetchWalletApi(cid) {
  const body = { id: cid };

  const response = await fetch(
    "https://api.okra.ng/v2/mock-api/fetch-wallet/",
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }
  );
  const jsonData = await response.json();
  let fetchedwallet = "";
  if (jsonData.status == "success") {
    fetchedwallet =
    jsonData.data.wallet.currency + " " + jsonData.data.wallet.amount;
  } else fetchedwallet = "Wallet Fetch Failed";

  return fetchedwallet;
}

async function payApi(from_id, to_id, amount) {
  const body = { from_id: from_id, to_id: to_id, amount: amount };

  const response = await fetch("https://api.okra.ng/v2/mock-api/pay", {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  const jsonData = await response.json();
  let payResponse = "";
  if (jsonData.status == "success") {
    payResponse = jsonData;
  } else payResponse = "Payment Failed";
  return payResponse;
}

async function refundCustomer(company, user, amount) {
  let getCustomerBal = await fetchWalletApi(user);
  let refundPayment = await payApi(company, user, amount);
  if (refundPayment.status == "success") {
    console.log(
      "Refund Status => ",
      refundPayment.message,
      "\nCustomer Balance Before Refund  =>",
      getCustomerBal,
      "\nCustomer Balance After Refund  =>",
      refundPayment.data.wallets.to.currency,
      refundPayment.data.wallets.to.amount
    );
  } else {
    console.log(
      "Refund Payment Failed",
      "\nCustomer Balance Before Refund  =>",
      getCustomerBal
    );
  }
}

await refundCustomer("484929849", "573839293", 2003.0);
