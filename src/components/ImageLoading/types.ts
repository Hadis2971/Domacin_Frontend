export type ImageLoadingProps = {
  url: string;
};

export type ImageComponentProps = {
  url: string;
};

export type UsePromiseParamType = {
  status?: string;
  value?: any;
  reason?: string;
  then: (p1: (res: any) => void, p2: (reason: any) => void) => void;
};
