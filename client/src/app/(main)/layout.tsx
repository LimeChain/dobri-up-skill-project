import SideSectionsPortlet from "@/components/organisms/SideSectionsPortlet/SideSectionsPortlet";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SideSectionsPortlet>{children}</SideSectionsPortlet>;
}
