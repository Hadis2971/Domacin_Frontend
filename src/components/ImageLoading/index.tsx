import { Suspense } from "react";
import GridLoader from "react-spinners/GridLoader";

import {
  ImageLoadingProps,
  ImageComponentProps,
  UsePromiseParamType,
} from "./types";

import "./ImageLoading.scss";

const ImageCache = new Map();

const usePromise = (promise: UsePromiseParamType) => {
  if (promise.status === "fulfilled") return promise.value;
  else if (promise.status === "rejected") throw promise.reason;
  else if (promise.status === "pending") throw promise;
  else {
    promise.status = "pending";
    promise.then(
      (res) => {
        promise.status = "fulfilled";
        promise.value = res;
      },
      (reason) => {
        promise.status = "rejected";
        promise.reason = reason;
      }
    );

    throw promise;
  }
};

const loadImage = async (url: string) => {
  const img = new Image();
  img.src = url;

  await new Promise((res) => {
    img.onload = () => {
      res(url);
    };
  });

  return url;
};

const fetchImage = (url: string) => {
  if (!ImageCache.has(url)) {
    ImageCache.set(url, loadImage(url));
  }

  return ImageCache.get(url);
};

const ImageComponent = ({ url }: ImageComponentProps) => {
  const src = usePromise(fetchImage(url));

  return <img src={String(src)} />;
};

const Loader = () => (
  <div className="image-loading-laoder">
    <GridLoader
      color={"#e91e63"}
      loading={true}
      size={30}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
);

export default function ({ url }: ImageLoadingProps) {
  return (
    <Suspense fallback={<Loader />}>
      <ImageComponent url={url} />
    </Suspense>
  );
}
