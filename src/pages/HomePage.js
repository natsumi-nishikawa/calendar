import { useEffect, useState } from "react";
import "./HomePage.css";

function HomePage({ onReserve }) {
  const heroImages = [
    "/images/model.png",
    "/images/salon1.png",
    "/images/salon2.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // 3秒ごとに画像を自動で切り替える
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  // 前の画像
  const handlePrev = () => {
    setCurrentImage((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  // 次の画像
  const handleNext = () => {
    setCurrentImage((prev) =>
      prev === heroImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="home-page">

      {/* 上部：サロンイメージ */}
      <section className="hero-section">

        <div className="hero-slider">
          <img
            src={heroImages[currentImage]}
            alt="サロンイメージ"
            className="hero-image"
          />

          {/* 左ボタン */}
          <button
            className="slider-button slider-prev"
            onClick={handlePrev}
          >
            ‹
          </button>

          {/* 右ボタン */}
          <button
            className="slider-button slider-next"
            onClick={handleNext}
          >
            ›
          </button>

          {/* ● ○ ○ の切り替えボタン */}
          <div className="slider-dots">
            {heroImages.map((image, index) => (
              <button
                key={image}
                className={`slider-dot ${
                  currentImage === index ? "active" : ""
                }`}
                onClick={() => setCurrentImage(index)}
                aria-label={`${index + 1}枚目の画像を表示`}
              />
            ))}
          </div>
        </div>

        <div className="hero-text">
          <p className="hero-small-title">
            Hair Salon
          </p>

          <h1>
            あなたらしい、
            <br />
            きれいを。
          </h1>

          <p>
            落ち着いた空間で
            <br />
            あなたに似合うスタイルをご提案します。
          </p>

          <button
            className="reserve-button"
            onClick={onReserve}
          >
            ご予約はこちら
          </button>
        </div>

      </section>


      {/* スタイル */}
      <section className="style-section">

        <p className="section-small-title">
          HAIR STYLE
        </p>

        <h2>Style Collection</h2>

        <div className="style-grid">

          <div className="style-card">
            <img
              src="/images/cut1.png"
              alt="カットスタイル1"
            />
            <h3>CUT</h3>
          </div>

          <div className="style-card">
            <img
              src="/images/cut2.png"
              alt="カットスタイル2"
            />
            <h3>CUT</h3>
          </div>

          <div className="style-card">
            <img
              src="/images/color1.png"
              alt="カラースタイル"
            />
            <h3>COLOR</h3>
          </div>

          <div className="style-card">
            <img
              src="/images/perm1.png"
              alt="パーマスタイル1"
            />
            <h3>PERM</h3>
          </div>

          <div className="style-card">
            <img
              src="/images/perm2.png"
              alt="パーマスタイル2"
            />
            <h3>PERM</h3>
          </div>

        </div>

      </section>


      {/* 下部予約 */}
      <section className="reservation-section">

        <p className="section-small-title">
          RESERVATION
        </p>

        <h2>Web Reservation</h2>

        <p>
          カレンダーから空き状況を確認して
          <br />
          ご予約いただけます。
        </p>

        <button
          className="reserve-button"
          onClick={onReserve}
        >
          空き状況を確認・予約する
        </button>

      </section>

    </div>
  );
}

export default HomePage;