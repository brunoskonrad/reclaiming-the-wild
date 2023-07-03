export type TraitFieldsetProps = {
  traitName: string;
  children: React.ReactNode;
};

export function TraitFieldset({ traitName, children }: TraitFieldsetProps) {
  return (
    <fieldset className="flex flex-col flex-wrap">
      <legend className="font-bold pb-2">{traitName}</legend>

      {children}
    </fieldset>
  );
}
