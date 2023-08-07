const isProduction = process.env.NODE_ENV === "production";

const apiBASEURL = isProduction
  ? (process.env.NEXT_PUBLIC_PROD_API_URL as string)
  : (process.env.NEXT_PUBLIC_DEV_API_URL as string);

export default apiBASEURL;
