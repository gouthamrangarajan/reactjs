import type { ReactNode } from "react";

export default function UserTableContainer({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  return (
    <div
      className="mx-auto flex w-11/12 flex-col rounded-lg bg-white px-6 py-4 shadow-2xl lg:w-7/12"     
    >
      {children}
    </div>
  );
}
