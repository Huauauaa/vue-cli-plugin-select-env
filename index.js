const fs = require('fs');
let options = null;

module.exports = (api, projectOptions) => {
  const { serve } = api.service.commands;
  const optionPath = api.resolve('dev.option.js');
  if (fs.existsSync(optionPath)) {
    options = require(optionPath);
  }
  const serveFn = serve.fn;

  serve.fn = async (...args) => {
    const parsedArgs = args[0];
    if (parsedArgs['select-env']) {
      if (options) {
        const option = await options.getOption();
        projectOptions.devServer.proxy['/api'].target = option.target;
      } else {
        console.error(
          `Project does not have the option config file(dev.option.js)!`,
        );
      }
      delete args[0]['select-env'];
      const index = args[1].findIndex((item) => item === '--select-env');
      args[1].splice(index, 1);
    }
    return serveFn(...args);
  };
};
