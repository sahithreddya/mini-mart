export const delayedFetch = async ({
  url,
  usertoken = "",
  options = {},
  delay = 1000,
}: {
  url: string;
  usertoken: string;
  options?: {};
  delay?: number;
}) => {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usertoken}`,
    },
  });
};
