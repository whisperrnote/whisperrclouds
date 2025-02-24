export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        {/* ...metadata... */}
      </head>
      <body>{children}</body>
    </html>
  );
}
