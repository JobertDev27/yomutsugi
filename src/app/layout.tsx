export const metadata = {
  title: "Yomutsugi",
  icon: "../public/favicon.ico",
  description: "Your companion for tracking anime, manga, manwha and manhua!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
