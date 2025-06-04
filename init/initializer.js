import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-8.0";

let isInitialized = false;

const initializeZoho = async () => {
  if (isInitialized) return;

  const environment = ZOHOCRMSDK.INDataCenter.PRODUCTION();
  const token = new ZOHOCRMSDK.OAuthBuilder()
    .clientId(process.env.ZOHOCRM_CLIENT_ID)
    .clientSecret(process.env.ZOHOCRM_CLIENT_SECRET)
    .refreshToken(process.env.ZOHOCRM_REFRESH_TOKEN)
    .build();

  await (await new ZOHOCRMSDK.InitializeBuilder())
    .environment(environment)
    .token(token)
    .initialize();

  isInitialized = true;
  console.log("Zoho SDK initialized");
};

export { ZOHOCRMSDK, initializeZoho };
