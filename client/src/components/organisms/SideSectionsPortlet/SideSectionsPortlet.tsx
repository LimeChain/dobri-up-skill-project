import { MenuItems } from "@/components/molecules/MenuItems/MenuItems";
import { RightSectionItems } from "@/components/molecules/RightSectionItems/RightSectionItems";

type SideSectionsPortletProps = { children: React.ReactNode };

const SideSectionsPortlet = ({ children }: SideSectionsPortletProps) => {
  return (
    <div className="flex gap-4 mx-2">
      <section className="hidden md:block md:flex-1/4 md:max-w-64 md:h-[100%]">
        <MenuItems />
      </section>
      <div className="flex-1/2 max-w-180 mx-auto">{children}</div>
      <section className="hidden md:block md:flex-1/4 md:max-w-96 md:h-[100%]">
        <RightSectionItems />
      </section>
    </div>
  );
};

export default SideSectionsPortlet;
