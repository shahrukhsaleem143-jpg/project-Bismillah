import './globals.css';

export const metadata = {
  title: 'Project Bismillah — Buyer Finder',
  description: 'WEEKEND wholesale buyer intelligence dashboard'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
