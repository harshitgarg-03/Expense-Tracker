import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-900/60">
        <div className="h-16 flex items-center px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200/50 bg-white/60 backdrop-blur dark:border-gray-800/50 dark:bg-gray-900/60">
        <div className="px-8 py-6 sm:px-6 lg:px-10">
          <Footer />
        </div>
      </footer>

    </div>
  );
}