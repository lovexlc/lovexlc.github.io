export const config = {
  github: {
    login: "lovexlc", // github login name, not user name
    repo: "lovexlc.github.io", //"urodele",
    logInUrl: "",
    logInAuthUrl: "",
  },
  head: {
    title: "lovexl",
  },
  footer: {
    copyright: "© lovexl",
    copyrightUrl: "https://github.com/lovexlc",
  },
  pagination: {
    size: 10,
  },
  giscus: false as object | false,
} as const;

export default config;
