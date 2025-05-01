import React, { forwardRef } from "react";

const Circle = forwardRef((props, ref) => {
  return (
    <div
      className="absolute h-5 w-5 rounded-full bg-white shadow-lg shadow-white"
      ref={ref}
      style={{ left: 0, top: 0 }}
    ></div>
  );
});

export default Circle;
