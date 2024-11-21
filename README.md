This is a [Next.js](https://nextjs.org/) project bootstrapped with [`c3`](https://developers.cloudflare.com/pages/get-started/c3).

## Deploying to Cloudflare

1. If you don't already have a Cloudflare account [create one](https://developers.cloudflare.com/fundamentals/setup/account/create-account/)
2. Clone the `compliment` branch of this repository and create a new GitHub repository for your project, push that branch to your new repository.
3. Create your own [KV](https://developers.cloudflare.com/kv/) to perform caching with the following command: `npx wrangler kv namespace create demo_kv`, the output will have a binding that needs to replace the existing binding in the `wrangler.toml` file.
4. Push these changes to your GitHub repository
5. Connect your [Git Provider to Cloudflare Pages](https://developers.cloudflare.com/pages/get-started/git-integration/#connect-your-git-provider-to-pages) and DEPLOY!
