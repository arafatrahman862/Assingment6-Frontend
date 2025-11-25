import type { ReactNode } from "react";

import Footer from "./layout-items/Footer";
import Navbar from "./layout-items/Navbar";



interface IProps {
    children: ReactNode
}

export default function CommonLayout({ children }: IProps) {
    return (
    <section className=" flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 shadow-md">
        <Navbar />
      </div>
      <main className="flex-1 pt-0 min-h-screen">
        {children}
      </main>

      <Footer />
    </section>
    )
}
