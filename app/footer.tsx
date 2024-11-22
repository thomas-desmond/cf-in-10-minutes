import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-gray-100 text-black py-1 w-full px-5 sticky bottom-0">
      <nav className="flex flex-row justify-between items-center">
        <div>
          <Link href="https://dash.cloudflare.com/sign-up" className="text-sm">
            Cloudflare Sign Up
          </Link>
          {" | "}
          <Link
            href="https://discord.com/invite/cloudflaredev"
            className="text-sm"
          >
            Cloudflare Discord
          </Link>
        </div>
        <div>
          <Link
            href="https://github.com/thomas-desmond/cf-in-10-minutes"
            className="text-sm"
          >
            GitHub Repository
          </Link>
        </div>
      </nav>
    </div>
  );
}
