const Test = () => {
  return (
    <div className="m-4 p-2 space-y-6">
      <div>
        <h1>Design System</h1>
        <p>This is the design system of this simple project</p>
      </div>
      {/* Colors */}
      <section>
        <h2>Colors</h2>
        <div className="flex flex-wrap gap-4">
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
        <h2>Typography</h2>
        <div>
          <p className="font-sans text-lg font-semibold">Heading</p>
        </div>
        <div>
          <p className="font-accent text-base font-semibold">Title</p>
        </div>
        <div>
          <p className="font-sans text-base font-semibold">Accent</p>
        </div>
        <div>
          <p className="font-accent text-base font-normal">Label</p>
        </div>
        <div>
          <p className="font-sans text-tiny font-normal">Body</p>
        </div>
      </section>
      {/* Buttons */}
      {/* Forms */}
      {/* Labels */}
    </div>
  );
};

export default Test;
