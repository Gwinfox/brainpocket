import type { CaptchaProps } from "../../../bll/types/loginTypes";
import styles from "./Captcha.module.css";

const Captcha = ({ captcha }: CaptchaProps) => {
  return <div className={styles.captcha} dangerouslySetInnerHTML={{ __html: captcha }}></div>;
};

export default Captcha;
