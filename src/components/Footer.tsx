import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <p>
              Copyright © 2026 Brevan Softwares. All Rights Reserved.
              <br />
              Email:{" "}
              <a href="mailto:brevansoftwares@gmail.com">
                brevansoftwares@gmail.com
              </a>{" "}
              | Phone:{" "}
              <a href="tel:+254117004147">+254 117 004 147</a>
              <br />
              <Link href="/privacy-policy">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
