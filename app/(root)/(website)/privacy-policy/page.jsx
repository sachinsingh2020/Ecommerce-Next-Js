import WebsiteBreadcrumb from "@/components/Application/Website/WebsiteBreadcrumb";
import React from "react";

const breadcrumb = {
  title: "Privacy Policy",
  links: [{ label: "Privacy Policy" }],
};

const PrivacyPolicy = () => {
  return (
    <div>
      <WebsiteBreadcrumb props={breadcrumb} />
      <div className="lg:px-40 px-5 py-20">
        <h1 className="text-xl font-semibold mb-3">Privacy Policy</h1>
        <p>
          At E-store, we are committed to protecting your privacy and ensuring
          that your personal information is handled in a safe and responsible
          manner.
        </p>

        <p className="mt-3">
          This Privacy Policy outlines how we collect, use, and safeguard your
          information when you visit our website or make a purchase.
        </p>

        <p className="mt-5">Information We Collect:</p>
        <ul className="list-disc ps-10 mt-3">
          <li>
            <b>Personal Information:</b> Such as your name, email address, phone
            number, and shipping/billing addresses, provided during account
            registration or checkout.
          </li>
          <li>
            <b>Payment Details:</b> Collected securely through encrypted payment
            gateways.
          </li>
          <li>
            <b>Usage Data:</b> Including your browser type, IP address, pages
            visited, and time spent on the site to help us improve user
            experience.
          </li>
        </ul>

        <p className="mt-5">How We Use Your Information:</p>
        <ul className="list-disc ps-10 mt-3">
          <li>To process your orders and provide customer support.</li>
          <li>
            To personalize your shopping experience and improve our services.
          </li>
          <li>
            To send order updates, promotional offers, and newsletters (you may
            opt out at any time).
          </li>
          <li>To ensure our website is secure and functioning properly.</li>
        </ul>

        <p className="mt-5">
          We do not sell, rent, or share your personal information with third
          parties, except when necessary to fulfill your order or comply with
          legal obligations.
        </p>

        <p className="mt-3">
          By using our website, you consent to the practices outlined in this
          Privacy Policy. We may update this policy from time to time, and any
          changes will be reflected on this page.
        </p>

        <p className="mt-3">
          If you have any questions or concerns regarding our Privacy Policy,
          please contact our support team.
        </p>

        <p className="mt-3">
          Thank you for trusting E-store. Your privacy is important to us.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
