export default function AdZone() {
  return (
    <div className="ad-zone">
      <div className="ad-zone__inner">
        <p className="ad-zone__label">Publicidade</p>
        <div className="ad-zone__grid">
          {/* Skin / top bar */}
          <div className="ad-zone__row">
            <div className="ad ad--skin">
              <span className="ad__label">Skin</span>
              <span className="ad__size">970×90</span>
            </div>
          </div>
          {/* Billboard */}
          <div className="ad-zone__row">
            <div className="ad ad--billboard">
              <span className="ad__label">Billboard</span>
              <span className="ad__size">970×250</span>
            </div>
          </div>
          {/* Leaderboard + MPU */}
          <div className="ad-zone__row">
            <div className="ad ad--leaderboard">
              <span className="ad__label">Leaderboard</span>
              <span className="ad__size">728×90</span>
            </div>
            <div className="ad ad--mpu">
              <span className="ad__label">MPU</span>
              <span className="ad__size">300×250</span>
            </div>
          </div>
          {/* Half Page */}
          <div className="ad-zone__row">
            <div className="ad ad--halfpage">
              <span className="ad__label">Half Page</span>
              <span className="ad__size">300×600</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
