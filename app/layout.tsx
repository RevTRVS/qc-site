import "./globals.css";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { AuthProvider } from "@/app/context/AuthContext";
import { ThemeProvider } from "@/app/context/ThemeContext";
import { ToastProvider } from "@/app/context/ToastContext";
import LocaleSetter from "@/app/components/LocaleSetter";
import FloatingDiscordLink from "@/app/components/FloatingDiscordLink";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${outfit.variable} ${jakarta.variable}`}>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <LocaleSetter />
              <FloatingDiscordLink />
              {children}
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}