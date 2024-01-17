import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "./index.module.css";
type Props = {
    initialImageUrl: string;
  };
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const handleClick = async () => {
        setLoading(true); // 読込中フラグを立てる
        const newImage = await fetchImage();
        setImageUrl(newImage.url); // 画像URLの状態を更新する
        setLoading(false); // 読込中フラグを倒す
      };
      return (
        <div className={styles.page}>
        <button onClick={handleClick} className={styles.button}>
          他のにゃんこも見る
        </button>
        <div className={styles.frame}>
          {loading || <img src={imageUrl} className={styles.img} />}
        </div>
      </div>
      );
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
      props: {
        initialImageUrl: image.url,
      },
    };
  };


export default IndexPage;
type Image = {
    url: string;
  };
const fetchImage = async ():Promise<Image>=> {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    return images[0];
  };
