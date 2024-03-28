import { ReactEventHandler, useState } from "react";

export const useLoadFavIcon = (): [
  boolean,
  ReactEventHandler<HTMLImageElement>
] => {
  const [showFallback, setshowFallback] = useState(false);

  const handleOnErrorImage: ReactEventHandler<HTMLImageElement> = () => {
    setshowFallback(true);
  };

  return [showFallback, handleOnErrorImage];
};
