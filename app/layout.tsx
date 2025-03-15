import { Geist } from "next/font/google";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Dog Adoption Center",
  description: "Adopt a Dog Today",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="">
          <section>
            <div className="content-wrapper">
              <div className="">{children}</div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
