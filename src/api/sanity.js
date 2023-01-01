import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import config from "../config";

const client = sanityClient({
  projectId: config.sanityProjectId,
  dataset: "production",
  apiVersion: "2023-01-01", // use a UTC date string
  //   token: "sanity-auth-token", // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});

// image builder
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
