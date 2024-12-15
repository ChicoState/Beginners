'use client';
import './guitar.css';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function GuitarPage() {
  const [rating, setRating] = useState(null);
  const [ratings, setRatings] = useState([]);

  // ページ固有の識別子（ここでは'GuitarPage'を例に）
  const pageId = 'GuitarPage';

  // SweetwaterのオンラインショップURL
  const shopUrl = "https://www.sweetwater.com/shop/guitars/?mrkgadid=1000000&mrkgcl=28&mrkgen=gtext&mrkgbflag=0&mrkgcat=guitars&acctid=21700000001645388&dskeywordid=43700080014876094&lid=43700080014876094&ds_s_kwgid=58700008706967294&device=c&network=g&matchtype=b&adpos=largenumber&locationid=1013671&creative=720307327394&targetid=kwd-10620651&campaignid=21227038220&awsearchcpc=1&gad_source=1&gclid=CjwKCAiA9vS6BhA9EiwAJpnXwxT9BeDn5iZOcef6f_DA4EOz76UWsfY9F-oUm6GlfX8kWPTuj-AjehoCzKEQAvD_BwE&gclsrc=aw.ds";

  // コンポーネントがマウントされた時にローカルストレージから評価を読み込む
  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem(`ratings_${pageId}`)) || [];
    setRatings(storedRatings);
  }, []);

  // 評価を保存
  const handleRating = (newRating) => {
    const updatedRatings = [...ratings, newRating];
    setRatings(updatedRatings);
    localStorage.setItem(`ratings_${pageId}`, JSON.stringify(updatedRatings)); // ページ固有のキーを使用
  };

  // 平均評価を計算
  const calculateAverageRating = () => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    return (total / ratings.length).toFixed(2);
  };

  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Badeen+Display&family=Delius&family=Moirai+One&family=Rubik+Puddles&family=Sacramento&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header>
        <h1 className="h1text">Guitar</h1>
        <h2 className="h4text">This is typically for acoustic guitar</h2>
      </header>

      <main>
        <h2 className="h3text">Buy your favorite guitar</h2>
        <h2 className="h2text">Tip: The quality improves around the $210 mark.</h2>
        <h2 className="h2text">Guitars in the $70 to $140 range can still be quite usable, </h2>
        <h2 className="h2text">but the chances of finding a good one are much lower compared to guitars over $210.</h2>
        <h2 className="h2text">Additionally, guitars under $210 often have poor build quality, which can affect playability. </h2>
        <h2 className="h2text">Issues are particularly common around the neck, where tuning stability can be compromised,  </h2>
        <h2 className="h2text">and poorly finished frets may even cause discomfort or injury to your hands.</h2>

        <a
          href={shopUrl}
          className="button1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Sweetwater's online guitar shop"
        >
          Online Shop
        </a>

        <h2 className="h2text">Other tool list</h2>
        <h2 className="h2text">・guitar pick</h2>
        <h2 className="h2text">・tuning meter</h2>
        <h2 className="h4text">Optional</h2>
        <h2 className="h2text">・capo</h2>
        <h2 className="h3text">Tuning</h2>
        <h2 className="h2text">Tune with the tuning meter</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/5jTsSvkBv60?si=6aQsXt4WbGjJdafR" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        <h2 className="h3text">Remember guitar chord</h2>
        <h2 className="h4text">A guitar chord refers to pressing the strings of the guitar in a specific way to produce multiple strings sounding together, creating a harmony.</h2>
        <h2 className="h4text">Chords play an important role in supporting the melody of music and are a key element in determining the mood and progression of a song.</h2>

        <h2 className="h2text">Guitar chord is one of the most important skills for playing guitar.</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/WGIcfDCWysQ?si=SnslMzLtFkgGyfT9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        <h2 className="h3text">Let's play song</h2>
        <h2 className="h2text">This is the part that's the most fun, but also the hardest.</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/KVacZUly59M?si=Wgf4eCnk2UC83z9n" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/MIt86Mr9o8Y?si=SJ7Bu4YLYbWdvq8x" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/XUZyjCqyf74?si=BRbDxO97Gkeh7dB3" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        <h2 className="tiptext">The key to getting better</h2>
        <h2 className="h2text">1. Play everyday</h2>
        <h2 className="h4text">Plactice everyday, getting used to it is the most important thing.</h2>
        <h2 className="h4text">finger plactice for everyday</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/yqod2-rDExI?si=GTmQUNvZ9xmNWejy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/NeNBXDw5uE4?si=KM5664P03mVbTj0y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h2 className="h2text">2. have fun</h2>
        <h2 className="h4text">This is very important, find guiter community or play for other people</h2>



        
                    {/* 評価セクション */}
                    <div className="rating-container">
                        <h2 className="h3text">Rate this page</h2>
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <span
                                    key={num}
                                    className={`star ${rating >= num ? 'filled' : ''}`}
                                    onClick={() => handleRating(num)}
                                    aria-label={`Rate ${num} stars`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <h3 className="h4text">Average Rating: {calculateAverageRating()} / 5</h3>
                    </div>
            </main>
        </div>
    );
}
