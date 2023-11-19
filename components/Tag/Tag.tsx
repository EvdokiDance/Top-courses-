import { TagProps } from "./Tag.props";
import cn from "classnames";
import styles from "./Tag.module.css";

export const Tag = ({
  size = "m",
  color = "ghost",
  children,
  className,
  href,
  ...props
}: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.s]: size == "s",
        [styles.m]: size == "m",
        [styles.ghost]: color == "ghost",
        [styles.gray]: color == "gray",
        [styles.green]: color == "green",
        [styles.primary]: color == "primary",
        [styles.red]: color == "red",
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
