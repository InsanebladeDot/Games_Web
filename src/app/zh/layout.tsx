"use client";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ChLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="pt-20 pl-6 md:pl-10 lg:pl-14">
        {children}
      </div>
      <Footer />
    </>
  );
} 