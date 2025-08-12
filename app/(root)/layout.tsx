import Navbar from "../component/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
      <main >
<Navbar/>
        {children}
      </main>
    
  );
}
