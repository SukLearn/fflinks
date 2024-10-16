import styles from "./Gatsby.module.css";
import gatsbyImg from "../../../../assets/gatsby.avif";
interface Prop {
  display: string;
}
export default function Gatsby({ display }: Prop) {
  return (
    <img
      style={{ display: display }}
      src={gatsbyImg}
      alt="The Great Gatsby Gives Toast"
      id={styles.great}
    />
  );
}
