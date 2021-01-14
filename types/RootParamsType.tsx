// for some reason it doesn't work as an interface
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootParamsType = {
  Home: undefined;
  Social: undefined;
  Login: undefined;
  Camera: { screen: string; params: { image: string } } | undefined;
};
