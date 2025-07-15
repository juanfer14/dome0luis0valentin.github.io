// /src/app/page.tsx

import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import TopBeaches from "@/components/home/TopBeaches";
import Testimonials from "@/components/home/Testimonials";
import Features from "@/components/home/Features";
import LoginSection from "@/components/home/LoginSection";
import Footer from "@/components/home/Footer";

export const metadata = {
  title: "Inicio | Playapp",
};

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Header />
      <Hero />
      <TopBeaches />
      <Testimonials />
      <Features />
      <LoginSection />
      <Footer />
    </>
  );
}
