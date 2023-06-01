import React from "react";
import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick, BR } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Summary = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [bionicReading, setBionicReading] = useState(false);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("article")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const convertBionic = (text) => {
    const words = text.split(" ");

    const bionicText = words.map((word, index) => {
      const charactersToBold = Math.ceil(word.length / 2);
      const firstHalfCharacters = word.substr(0, charactersToBold);
      const unboldWord = word.substr(charactersToBold);

      return (
        <p key={index} style={{ display: "inline" }}>
          <strong>{firstHalfCharacters}</strong>
          {unboldWord}
          <span> </span>
        </p>
      );
    });

    return <div>{bionicText}</div>;
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search bar */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL of an article"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus: border-gray-700 peer-focus: text-gray-700"
          >
            ↵
          </button>
        </form>
        {/* URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Summary */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn't supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl prevent-select">
                  Article{" "}
                  <span className="blue_gradient prevent-select">Summary</span>
                </h2>
                <div className="flex">
                  <div
                    className="copy_btn"
                    onClick={() => setBionicReading(!bionicReading)}
                  >
                    <img
                      src={BR}
                      alt="bionic_reading_icon"
                      className="w-[50%] h-[50%] object-contain"
                    />
                  </div>
                  <div
                    className="copy_btn ml-3"
                    onClick={() => handleCopy(article.summary)}
                  >
                    <img
                      src={copied === article.summary ? tick : copy}
                      alt="copy_icon"
                      className="w-[40%] h-[40%] object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700 text-justify leading-6">
                  {bionicReading
                    ? convertBionic(article.summary)
                    : article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Summary;
