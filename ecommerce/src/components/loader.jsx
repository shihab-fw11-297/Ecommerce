import React from 'react'

const Loader = () => {
  return (
    <section className="loader">
      <div></div>
    </section>
  );
};

export default Loader;
export const Skeleton = ({ width = 'unset', length, home }) => {
  console.log("length", length);
  const skeletons = Array.from({ length }, (_, idx) => (
    <div key={idx} className="skeleton-card">
      <div className="skeleton-card-image"></div>
      <div className="skeleton-card-details">
        <div className="skeleton-card-name"></div>
        <div className="skeleton-card-price"></div>
      </div>
    </div>
  ));

  return (
    <div className="skeleton-loader" style={{ width, flexWrap: !home ? 'wrap' : 'nowrap' }}>
      {skeletons}
    </div>
  );
};
