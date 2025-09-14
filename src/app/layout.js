import './globals.css';

export const metadata = {
  title: 'BarBosh Flat Temp',
  description: "The current temperature of Sir Barbosh's Flat",
  openGraph: {
    title: 'BarBosh Flat Temp',
    description: "The current temperature of Sir Barbosh's Flat",
    images: ['/Sir BarBosh Logo.png'],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
