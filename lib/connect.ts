import { headers } from "next/headers";



export const LEMON_SQUEEZY_ENDPOINT="https://api.lemonsqueezy.com/v1/";


export const lemonSqueezyApiInstance = {
    baseURL : LEMON_SQUEEZY_ENDPOINT,
    headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API}`,
    }
}