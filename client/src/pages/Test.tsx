enum TypographyKey {
  H1,
  H2,
  H3,
  H4,
  H5,
}
const typographyStyle = [
  "text-lg font-sans",
  "text-base font-accent",
  "text-sm font-sans",
  "text-xs font-sans",
  "text-2xs font-accent",
];
const typographyBase = "tracking-tight font-medium";
const typography: Record<keyof typeof TypographyKey, string> =
  typographyStyle.reduce((o: Record<string, string>, v, i) => {
    o[TypographyKey[i]] = typographyBase + " " + v;
    return o;
  }, {});

const Test = () => {
  return (
    <div className="px-8 py-4 tracking-tight font-medium">
      <h1 className="text-2xl font-accent text-gray-900 font-semibold">
        Design System
      </h1>

      <section className="flex-col my-8 max-w-lg">
        <p className={typography.H1 + " " + "h-16"}>
          Almost before we knew it, we had left the ground.
        </p>
        <p className={typography.H2 + " " + "h-16"}>
          Almost before we knew it, we had left the ground.
        </p>
        <p className={typography.H3 + " " + "h-16"}>
          Almost before we knew it, we had left the ground.
        </p>
        <p className={typography.H4 + " " + "h-16"}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
          debitis aliquid et vitae est quo saepe voluptatum doloremque quasi
          possimus dolorem animi earum soluta, eaque magnam blanditiis non,
          delectus natus.
        </p>
        <p className={typography.H5 + " " + "h-16"}>
          Almost before we knew it, we had left the ground.
        </p>
      </section>
    </div>
  );
};

export default Test;
