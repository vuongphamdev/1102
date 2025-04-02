interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {children}
    </div>
  );
} 