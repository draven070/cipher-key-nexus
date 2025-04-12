
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-cyan-950/30 flex flex-col">
      <header className="border-b border-border/40 backdrop-blur-sm bg-secondary/5 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="font-bold text-xl text-gradient">CipherKey Nexus</h1>
          <nav>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-cipher-400 transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4 md:px-0 animate-fade-in">
        {children}
      </main>

      <footer className="border-t border-border/40 py-6 backdrop-blur-sm bg-secondary/5">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>CipherKey Nexus — Learn the basics of cryptography</p>
          <p className="mt-2 text-xs">
            This tool is for educational purposes only. For sensitive data,
            always use industry-standard security practices.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
