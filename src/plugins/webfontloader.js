/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts() {
  const webFontLoader = await import(
    /* webpackChunkName: "webfontloader" */ "webfontloader"
  );

  webFontLoader.load({
    custom: {
      families: [
        "NewzaldTest-Black",
        "NewzaldTest-BlackItalic",
        "NewzaldTest-Bold",
        "NewzaldTest-BoldItalic",
        "NewzaldTest-Book",
        "NewzaldTest-BookItalic",
        "NewzaldTest-Medium",
        "NewzaldTest-MediumItalic",
      ],
    },
  });
}
