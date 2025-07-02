
import "./globals.css";


export const metadata = {
  title: "React's Eleven Hooks",
  description: "An interactive React tutorial, featuring the Eleven core React hooks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body

      >
        {children}
      </body>
    </html>
  );
}
