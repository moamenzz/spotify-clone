import { FC } from "react";

interface LoaderProps {
  className?: string;
}

const Loader: FC = ({ className }: LoaderProps) => {
  return (
    <span className={` ${className} loading loading-spinner loading-lg`}></span>
  );
};

export default Loader;
