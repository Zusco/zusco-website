import React from "react";
import {
  boldIndicator,
  linkIndicator,
  tabIndicator,
} from "utils/privacyPolicy";
import terms from "utils/terms";

import CommonLayout from "components/layout";

const TermsList = () => {
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
        <h1 className="text-black bold-font text-3.5xl mb-4">
          TERMS AND CONDITIONS
        </h1>
        <div className="w-full text-black">
          {terms?.split("\n").map((text, i) => {
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
                      const linkStrLink = linkStr.includes(
                        "platform/privacy-policy"
                      )
                        ? "https://getzusco.com/platform/privacy-policy"
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
export default TermsList;
