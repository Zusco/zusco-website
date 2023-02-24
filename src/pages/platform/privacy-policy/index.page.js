import React from "react";
import privacyPolicy, {
  boldIndicator,
  linkIndicator,
  tabIndicator,
} from "utils/privacyPolicy";
import CommonLayout from "components/layout";

const PrivacyPolicy = () => {
  const renderTextLink = (text, link) => (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="text-blue underline"
      key={text + Math.random()}
    >
      {text}
    </a>
  );

  const renderBoldText = (text) => (
    <span className="medium-font" key={text + Math.random()}>
      {text}
    </span>
  );
  const renderTabText = (text) => (
    <span className="ml-6 md:ml-8" key={text + Math.random()}>
      {text}
    </span>
  );

  return (
    <CommonLayout>
      <div className="flex flex-col justify-start items-start h-fit w-full px-6 md:px-14 lg:px-16 2xl:px-20 pt-8">
        <h1 className="text-black bold-font text-3.5xl mb-4">PRIVACY NOTICE</h1>
        <div className="w-full text-black">
          {privacyPolicy?.split("\n").map((text, i) => {
            return (
              <p className="mb-6 w-full text-xl" key={text + i}>
                {text.split("\b").map((str) => {
                  if (
                    str.includes(boldIndicator) ||
                    str.includes(tabIndicator)
                  ) {
                    return str.includes(tabIndicator)
                      ? renderTabText(str.replace(tabIndicator, "") + " ")
                      : renderBoldText(str.replace(boldIndicator, ""));
                  } else if (str.includes(linkIndicator)) {
                    return str.split(" ").map((linkStr) => {
                      const linkStrLink =
                        linkStr === "here#link,"
                          ? "https://app.termly.io/notify/47438251-7eaa-40c8-8a88-f4893c2b62f3"
                          : linkStr === "link.#link"
                          ? "https://policies.google.com/privacy"
                          : linkStr ===
                            "https://paystack.com/privacy/merchant#link."
                          ? "https://paystack.com/privacy/merchant"
                          : linkStr.includes("ec.europa.eu/justice/")
                          ? "https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.html"
                          : linkStr.includes("edoeb.admin.ch")
                          ? "https://www.edoeb.admin.ch/edoeb/en/home.html"
                          : linkStr.includes("info@getzusco.com")
                          ? "mailto:info@getzusco.com"
                          : linkStr.includes("getzusco.com")
                          ? "https://getzusco.com/"
                          : "";
                      return linkStr.includes(linkIndicator)
                        ? renderTextLink(
                            linkStr.replace(linkIndicator, "") + " ",
                            linkStrLink
                          )
                        : linkStr + " ";
                    });
                  }
                  return str + " ";
                })}
              </p>
            );
          })}
        </div>
      </div>
    </CommonLayout>
  );
};
export default PrivacyPolicy;
