export const config = {
  github: {
    login: "lovexlc", // github login name, not user name
    repo: "lovexlc.github.io", //"urodele",
    logInUrl: "",
    logInAuthUrl: "",
  },
  head: {
    title: "Urodele",
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
