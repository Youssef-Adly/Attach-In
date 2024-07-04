import React, { memo } from "react";
import "./PricingPage.css";
import { Link } from "react-router-dom";

const PricingPage = () => {
  return (
    <>
      <section id="pricing" className="pricing-content section-padding">
        <div className="container">
          <div className="section-title text-center">
            <h1>Pricing Plan</h1>
            <p>Coming Soon</p>
          </div>
          <div className="row text-center">
            <div
              className="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.1s"
              data-wow-offset={0}
            >
              <div className="single-pricing">
                <div className="price-head">
                  <h2>Starter</h2>
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <h1 className="price">$29</h1>
                <h5>Monthly</h5>
                <ul>
                  <li>5 website</li>
                  <li>50GB Disk Space</li>
                  <li>50 Email Accounts</li>
                </ul>
                <Link to={""} className="nav-link">
                  Get start
                </Link>
              </div>
            </div>
            {/*- END COL */}
            <div
              className="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
              data-wow-offset={0}
            >
              <div className="single-pricing">
                <div className="price-head">
                  <h2>popular</h2>
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <h1 className="price">$49</h1>
                <h5>Monthly</h5>
                <ul>
                  <li>10 website</li>
                  <li>50GB Disk Space</li>
                  <li>50 Email Accounts</li>
                  <li>50GB Monthly Bandwidth</li>
                  <li>10 Subdomains</li>
                </ul>
                <Link to={""} className="nav-link">
                  Get start
                </Link>
              </div>
            </div>
            {/*- END COL */}
            <div
              className="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
              data-wow-offset={0}
            >
              <div className="single-pricing single-pricing-white">
                <div className="price-head">
                  <h2>Advance</h2>
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <span className="price-label">Best</span>
                <h1 className="price">$69</h1>
                <h5>Monthly</h5>
                <ul>
                  <li>15 website</li>
                  <li>50GB Disk Space</li>
                  <li>50 Email Accounts</li>
                  <li>50GB Monthly Bandwidth</li>
                  <li>10 Subdomains</li>
                  <li>15 Domains</li>
                  <li>Unlimited Support</li>
                </ul>
                <Link to={""} className="nav-link">
                  Get start
                </Link>
              </div>
            </div>
            {/*- END COL */}
          </div>
          {/*- END ROW */}
        </div>
        {/*- END CONTAINER */}
      </section>
    </>
  );
};

export default memo(PricingPage);
