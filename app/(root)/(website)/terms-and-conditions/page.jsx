import WebsiteBreadcrumb from "@/components/Application/Website/WebsiteBreadcrumb";
import React from "react";

const breadcrumb = {
  title: "Terms & Conditions",
  links: [{ label: "Terms & Conditions" }],
};

const TermsAndConditions = () => {
  return (
    <div>
      <WebsiteBreadcrumb props={breadcrumb} />
      <div className="lg:px-40 px-5 py-20">
        <h1 className="text-xl font-semibold mb-3">Terms & Conditions</h1>

        <p>
          Welcome to E-store. By accessing or using our website, you agree to be
          bound by the following terms and conditions. Please read them
          carefully.
        </p>

        <p className="mt-3">
          If you do not agree with any part of these terms, please do not use
          our website.
        </p>

        <p className="mt-5">
          <b>1. Use of Our Website:</b>
        </p>
        <ul className="list-disc ps-10 mt-3">
          <li>
            You must be at least 18 years old or visiting under the supervision
            of a parent or guardian.
          </li>
          <li>
            You agree to use our website for lawful purposes only and not for
            any fraudulent or harmful activity.
          </li>
        </ul>

        <p className="mt-5">
          <b>2. Product Information:</b>
        </p>
        <ul className="list-disc ps-10 mt-3">
          <li>
            We strive to display accurate product details, prices, and
            availability, but errors may occur.
          </li>
          <li>
            We reserve the right to correct any inaccuracies and update
            information at any time without prior notice.
          </li>
        </ul>

        <p className="mt-5">
          <b>3. Orders & Payments:</b>
        </p>
        <ul className="list-disc ps-10 mt-3">
          <li>
            Placing an order does not guarantee product availability. Orders may
            be canceled or adjusted if stock is unavailable.
          </li>
          <li>
            All payments must be made through our secure payment gateways. We do
            not store card information.
          </li>
        </ul>

        <p className="mt-5">
          <b>4. Returns & Refunds:</b>
        </p>
        <ul className="list-disc ps-10 mt-3">
          <li>
            Please refer to our Return Policy for detailed information on
            returns, exchanges, and refund eligibility.
          </li>
        </ul>

        <p className="mt-5">
          <b>5. Intellectual Property:</b>
        </p>
        <ul className="list-disc ps-10 mt-3">
          <li>
            All content on E-store, including logos, images, and text, is the
            property of E-store and protected by copyright laws.
          </li>
          <li>
            You may not use, copy, or reproduce any material without our written
            consent.
          </li>
        </ul>

        <p className="mt-5">
          <b>6. Limitation of Liability:</b>
        </p>
        <ul className="list-disc ps-10 mt-3">
          <li>
            We are not liable for any damages resulting from the use or
            inability to use our website or products.
          </li>
        </ul>

        <p className="mt-5">
          <b>7. Changes to Terms:</b>
        </p>
        <ul className="list-disc ps-10 mt-3">
          <li>
            We may update these Terms & Conditions at any time. Continued use of
            the website implies acceptance of the new terms.
          </li>
        </ul>

        <p className="mt-5">
          If you have any questions regarding these terms, please contact our
          customer support team.
        </p>

        <p className="mt-3">
          Thank you for choosing E-store. We value your trust and are committed
          to delivering a secure and reliable shopping experience.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
