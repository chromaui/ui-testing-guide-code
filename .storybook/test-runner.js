// const { injectAxe, getViolations } = require('axe-playwright');
// const fs = require('fs');

// module.exports = {
//   setup() {
//     fs.mkdir(
//       process.cwd() + '/src/__accessibility__/',
//       { recursive: true },
//       (err) => {
//         if (err) throw err;
//       }
//     );
//   },
//   async preRender(page, context) {
//     await injectAxe(page);
//   },
//   async postRender(page, context) {
//     const violations = await getViolations(page, '#root', {
//       detailedReport: true,
//     });

//     // Do something with violations
//     // For example, write them to a file
//     await new Promise((resolve, reject) => {
//       fs.writeFile(
//         process.cwd() + `/src/__accessibility__/${context.id}.json`,
//         JSON.stringify(violations, null, 2),
//         (err) => {
//           if (err) reject(err);
//           resolve();
//         }
//       );
//     });
//   },
// };

const { injectAxe, checkA11y } = require('axe-playwright');

module.exports = {
  async preRender(page, context) {
    await injectAxe(page);
  },
  async postRender(page, context) {
    await checkA11y(page, '#root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });

    const accTree = await page.accessibility.snapshot();
    expect(accTree).toMatchSnapshot();
  },
};
