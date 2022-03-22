const { injectAxe, checkA11y } = require('axe-playwright');

const config = {
  async preRender(page, context) {
    await injectAxe(page);
  },
  async postRender(page, context) {
    await checkA11y(
      page,
      context.title.includes('Screen') ? undefined : '#root'
    );
  },
};

module.exports = config;
