import sanityClient from "@sanity/client";
import config from "../config";

export const client = sanityClient({
  projectId: config,
  dataset: "production",
  apiVersion: "2021-10-21", // use a UTC date string
  //   token: "sanity-auth-token", // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});
