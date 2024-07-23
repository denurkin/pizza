import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="283" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="333" rx="0" ry="0" width="280" height="90" />
    <rect x="0" y="450" rx="0" ry="0" width="91" height="27" />
    <rect x="128" y="442" rx="30" ry="30" width="152" height="42" />
  </ContentLoader>
);

export default Skeleton;
