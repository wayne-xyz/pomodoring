
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";



export const metadata = {
  title: "Pomodoring - Measure and Improve",
  description: "Pomodoring is a pomodoro timer that helps you measure and improve your productivity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <main>{children}</main>
      <Toaster />
      </body>
    </html>
  );
}
