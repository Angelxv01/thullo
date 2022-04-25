import styled from "styled-components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStyled = (element: any, base: string) =>
  styled(element).attrs((props) => ({
    className: base + " " + props.className,
  }))``;

const Heading = createStyled("p", "font-sans text-lg font-semibold");
const Title = createStyled("p", "font-accent text-base font-semibold");
const Accent = createStyled("p", "font-sans text-base font-semibold");
const Label = createStyled("p", "font-accent text-base font-normal");
const Body = createStyled("p", "font-sans text-tiny font-normal");

const Test = () => {
  return (
    <div className="m-4 p-2 space-y-6">
      <div>
        <h1>Design System</h1>
        <p>This is the design system of this simple project</p>
      </div>
      {/* Colors */}
      <section>
        <Heading as="h2">Colors</Heading>
        <div className="flex flex-wrap gap-4 mt-2">
          <div className="w-64 shadow-lg">
            <div className="bg-dark w-full h-24"></div>
            <div className="py-2 px-3">
              <h3>Dark</h3>
              <p>#000000</p>
            </div>
          </div>
          <div className="w-64 shadow-lg">
            <div className="bg-white border-2 border-dark w-full h-24"></div>
            <div className="py-2 px-3">
              <h3>White</h3>
              <p>#FFFFFF</p>
            </div>
          </div>
          <div className="w-64 shadow-lg">
            <div className="bg-green-dark w-full h-24"></div>
            <div className="py-2 px-3">
              <h3>Dark Green</h3>
              <p>#219653</p>
            </div>
          </div>
          <div className="w-64 shadow-lg">
            <div className="bg-green-light w-full h-24"></div>
            <div className="py-2 px-3">
              <h3>Light Green</h3>
              <p>#6FCF97</p>
            </div>
          </div>
          <div className="w-64 shadow-lg">
            <div className="bg-yellow w-full h-24"></div>
            <div className="py-2 px-3">
              <h3>Yellow</h3>
              <p>#F2C94C</p>
            </div>
          </div>
          <div className="w-64 shadow-lg">
            <div className="bg-orange w-full h-24"></div>
            <div className="py-2 px-3">
              <h3>Orange</h3>
              <p>#F2994A</p>
            </div>
          </div>
          <div className="w-64 shadow-lg">
            <div className="bg-red w-full h-24"></div>
            <div className="py-2 px-3">
              <h3>Red</h3>
              <p>#EB5757</p>
            </div>
          </div>
          <div className="w-64 shadow-lg">
            <div className="bg-blue-dark w-full h-24"></div>
            <div className="py-2 px-3">
              <h3>Dark Blue</h3>
              <p>#2F80ED</p>
            </div>
          </div>
          <div className="w-64 shadow-lg">
            <div className="bg-blue-light w-full h-24"></div>
            <div className="py-2 px-3">
              <h3>Light Blue</h3>
              <p>#56CCF2</p>
            </div>
          </div>
        </div>
      </section>
      {/* Typography */}
      <section>
        <Heading as="h2">Typography</Heading>
        <div className="space-y-1 mt-2">
          <Heading className="text-blue-dark">Heading</Heading>
          <Title>Title</Title>
          <Accent>Accent</Accent>
          <Label>Label</Label>
          <Body>Body</Body>
        </div>
      </section>
      {/* Buttons */}
      <section>
        <Heading as="h2">Buttons</Heading>
        <div>
          <div className="">
            <Title as="h3">Normal</Title>
            <div className="flex gap-4 items-center mt-2">
              <button className="text-sm border-2 border-blue-dark py-1 px-3 rounded-lg items-center gap-2 text-gray-900 hover:bg-blue-dark hover:text-white animation ease-in-out duration-300 active:bg-blue-600 active:border-blue-600 font-medium capitalize hover:shadow-md hover:shadow-blue-dark/30 active:shadow-blue-dark/50">
                Fully functional
              </button>
              <button className="text-sm border-2 border-blue-dark py-1 px-3 rounded-lg items-center gap-2 bg-blue-dark text-white font-medium capitalize shadow-md shadow-blue-dark/30">
                Hover
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Forms */}
      {/* Labels */}
    </div>
  );
};

export default Test;
