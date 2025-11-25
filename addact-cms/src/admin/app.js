import fevicon from "./extensions/addact-logo-white.svg";
import mainlogo from "./extensions/addact-logo-white.svg";

export default {
  config: {
    // auth: {
    //   logo: fevicon,
    // },
    // Replace the favicon
    head: {
      favicon: fevicon,
    },
    // Replace the Strapi logo in the main navigation
    menu: {
      logo: fevicon,
    },
    // Override or extend the theme
    // theme: {
    //   colors: {
    //     alternative100: '#f6ecfc',
    //     alternative200: '#e0c1f4',
    //     alternative500: '#ac73e6',
    //     alternative600: '#9736e8',
    //     alternative700: '#8312d1',
    //     danger700: '#b72b1a'
    //   },
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "Addxp Technologies",

        "app.components.LeftMenu.navbrand.workplace":
          "Digital Customer Experience Management Solution",

        "Auth.form.welcome.title": "Addact Technologies Pvt Ltd",

        "Auth.form.welcome.subtitle": "Login to your account",

        "Settings.profile.form.section.experience.interfaceLanguageHelp":
          "Preference changes will apply only to you.",
      },
    },
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
  },
  bootstrap(app) {
    console.log(app);
  },
};
