import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { IMAGE_SIZE } from "../utils/constants";
import { Fragment, useState } from "react";
import axios from "axios";

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    prompt: "",
    size: IMAGE_SIZE.SMALL,
    placeholder: "Ex. A cute baby sea otter",
  });
  const [images, setImages] = useState();
  const [error, setError] = useState();

  const handleInputChange = (e) => {
    setError('');
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleOnChange = (e) => {
    setError('');
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const generateImage = async () => {
    setLoading(true);
    setError('');
    const body = {
      ...inputValues,
    };
    try {
      const responseData = await axios.post("/api/generateImage", body);
      if (responseData && responseData.data) {
        setLoading(false);
        setImages(responseData.data);
      }
    } catch (err) {
      setLoading(false);
      setError("Oops!! An Error Occoured!");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>ImageGen</title>
        <meta
          name="description"
          content="Image generator app, powered by Open AI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.heading}>Text to Image</div>
        <div className={styles.formContainer}>
          <div className={styles.formRow}>
            <label>Describe an Image</label>
            <input
              type="text"
              value={inputValues.prompt}
              onChange={handleInputChange}
              name="prompt"
              placeholder={inputValues.placeholder}
            />
          </div>
          <div className={styles.formRow}>
            <label>Select Image Size</label>
            <select onChange={handleOnChange} name="size">
              <option value={IMAGE_SIZE.SMALL}>Small</option>
              <option value={IMAGE_SIZE.MEDIUM}>Medium</option>
              <option value={IMAGE_SIZE.LARGE}>Large</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <button onClick={generateImage} disabled={isLoading}>
              Generate
            </button>
          </div>
        </div>
        <div className={styles.resultContainer}>
          {error && <div className={styles.loaderHeading}>{error}</div>}
          {isLoading && (
            <Fragment>
              <div className={styles.loaderHeading}>
                Please wait! Good things take time!!
              </div>
              <div className={styles.loader} />
            </Fragment>
          )}
          <div className={styles.grid}>
            {!isLoading && images &&
              images.map((data, index) => (
                <div className={styles.card} key={`image_${index}`}>
                  <Image src={data.url} width={200} height={200} alt="Image" />
                </div>
              ))}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div>Copyright #Ray @ {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
