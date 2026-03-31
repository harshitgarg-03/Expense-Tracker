import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-gray-900/60 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="h-16 flex items-center px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </div>

      <div className="w-full">
        {children}
      </div>

      <footer className="w-full border-t border-gray-200/50 dark:border-gray-800/50 bg-white/60 dark:bg-gray-900/60 backdrop-blur">
        <div className="w-full px-8 sm:px-6 lg:px-10 py-6">
          <Footer />
        </div>
      </footer>
    </>
  );
}
