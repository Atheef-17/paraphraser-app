import { useEffect } from "react";

function AdPlaceholder() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "block",
        marginTop: "20px",
        marginBottom: "20px",
      }}
      data-ad-client="ca-pub-8773450340039628"
      data-ad-slot="YOUR_AD_SLOT_ID"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}

export default AdPlaceholder;