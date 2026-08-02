export default function PageHeading({ title }: { title: string }) {
  return (
    <div className="page-heading">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-text">
              <h2>{title}</h2>
              <div className="div-dec"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
