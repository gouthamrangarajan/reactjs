import type { NextComponentType, NextPageContext } from "next";

const SecondRowLayout: NextComponentType<NextPageContext, {}, layoutType> = ({
  children,
}) => {
  return (
    <div className="flex w-full items-center justify-center mt-6 flex-shrink-0">
      <div
        className="flex flex-col space-y-1 lg:space-y-0 lg:flex-row lg:space-x-4 lg:items-center 
         w-11/12 lg:w-10/12 xl:w-8/12"
      >
        {children}
      </div>
    </div>
  );
};
type layoutType = {
  children: React.ReactNode[] | React.ReactNode | undefined;
};
export default SecondRowLayout;
