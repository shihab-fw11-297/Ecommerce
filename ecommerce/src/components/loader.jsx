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



export const LoadingTable = () => {
  return (
    <table className={`loading-table loading`}>
      <thead>
        <tr>
        <th className="loading-cell" style={{ padding: '2rem 1rem' }}></th>
          <th className="loading-cell" style={{ padding: '2rem 1rem' }}></th>
          <th className="loading-cell" style={{ padding: '2rem 1rem' }}></th>
          <th className="loading-cell" style={{ padding: '2rem 1rem' }}></th>
          <th className="loading-cell" style={{ padding: '2rem 1rem' }}></th>
          <th className="loading-cell" style={{ padding: '2rem 1rem' }}></th>
        </tr>
      </thead>
      <tbody>
            <tr>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
            </tr>
            <tr>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
            </tr>
            <tr>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
            </tr>
            <tr>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
              <td className="loading-cell"></td>
            </tr>
      </tbody>
    </table>
  );
};


export const SkeletonOrderDetail = () => (
  <div className="skeleton-order-detail">
    <div className="skeleton-order-header"></div>
    <div className="skeleton-info-section"></div>
    <div className="skeleton-order-items">
      <div className="skeleton-order-item">
        <div className="skeleton-img"></div>
        <div className="skeleton-item-details">
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="skeleton-order-item">
        <div className="skeleton-img"></div>
        <div className="skeleton-item-details">
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
    <div className="skeleton-order-summary"></div>
    <div className="skeleton-order-dates"></div>
  </div>
);