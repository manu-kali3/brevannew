import type { ServiceProduct } from "@/lib/service-pages";

/**
 * Branded product highlight for a service page (e.g. Shule Breeze on the
 * school management page). The logo is served by the product's own site,
 * so no copy of it is bundled here — update the URL via env if it moves.
 */
export default function ServiceProductCard({
  product,
}: {
  product: ServiceProduct;
}) {
  return (
    <section className="service-page-section service-product">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="product-card">
              <div className="product-card-head">
                <div className="product-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.logo}
                    alt={`${product.name} logo`}
                    loading="lazy"
                    decoding="async"
                    width={64}
                    height={64}
                  />
                </div>
                <div className="product-title">
                  <span className="product-kicker">{product.kicker}</span>
                  <h4>{product.name}</h4>
                  <p className="product-tagline">{product.tagline}</p>
                </div>
              </div>

              <p className="product-description">{product.description}</p>

              <ul className="product-highlights">
                {product.highlights.map((item) => (
                  <li key={item.label}>
                    <i className={item.icon} aria-hidden="true"></i>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>

              <div className="product-actions">
                <div className="green-button">
                  <a
                    href={product.primaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {product.primaryCta.label}{" "}
                    <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                  </a>
                </div>
                {product.secondaryCta && (
                  <div className="orange-button">
                    <a
                      href={product.secondaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.secondaryCta.label}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
