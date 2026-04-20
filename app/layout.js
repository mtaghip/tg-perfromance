export const metadata = {
  title: 'TG Performance Cars',
  description: 'TG Performance Cars website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
