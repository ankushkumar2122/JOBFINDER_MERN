import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="mb-4">
          At <span className="font-semibold">JobFinder.com</span>, your privacy
          is very important to us. This Privacy Policy explains how we collect,
          use, and protect your information when you use our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect personal information such as your name, email address,
          resume, and job preferences when you register or apply for jobs on our
          platform.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <p className="mb-4">The information we collect is used to:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Provide job recommendations tailored to your profile</li>
          <li>Improve user experience and website functionality</li>
          <li>Communicate important updates and notifications</li>
          <li>Ensure compliance with applicable laws</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Data Protection</h2>
        <p className="mb-4">
          We take appropriate technical and organizational measures to secure
          your personal information and prevent unauthorized access.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Sharing of Information</h2>
        <p className="mb-4">
          We do not sell or trade your personal data. Information may be shared
          only with trusted partners (such as employers) strictly for job-related
          purposes.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your information. You
          may also opt out of receiving non-essential communications from us at
          any time.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with the updated date.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <a
            href="mailto:support@jobfinder.com"
            className="text-blue-600 underline"
          >
            {/* support@jobfinder.com */}
            comming soon
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
