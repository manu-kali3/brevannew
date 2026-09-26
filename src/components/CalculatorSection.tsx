import QuoteForm from "@/components/QuoteForm";

export default function CalculatorSection() {
  return (
    <section className="calculator">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 mx-auto">
            <div className="section-heading">
              <h6>Start Your Project</h6>
              <h4>Request a Free Quote</h4>
            </div>
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}