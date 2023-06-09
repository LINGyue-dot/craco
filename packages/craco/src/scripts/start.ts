import type { BaseContext, CracoConfig } from '@craco/types';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import { findArgsFromCli } from '../lib/args';

// Make sure this is called before "paths" is imported.
findArgsFromCli();

import { loadCracoConfigAsync } from '../lib/config';
import { getCraPaths, start } from '../lib/cra';
import { overrideDevServer } from '../lib/features/dev-server/override';
import { overrideWebpackDev } from '../lib/features/webpack/override';
import { overridePaths } from '../lib/features/paths/override';
import { log } from '../lib/logger';
import { validateCraVersion } from '../lib/validate-cra-version';

log('Override started with arguments: ', process.argv);
log('For environment: ', process.env.NODE_ENV);

const context: BaseContext = {
  env: process.env.NODE_ENV,
};

loadCracoConfigAsync(context).then((cracoConfig: CracoConfig) => {
  // cracoConfig 就是 craco 的最终 config
  validateCraVersion(cracoConfig);

  // 返回 react-scripts/config.paths.js 
  context.paths = getCraPaths(cracoConfig);

  context.paths = overridePaths(cracoConfig, context);

  overrideWebpackDev(cracoConfig, context);
  
  overrideDevServer(cracoConfig, context);

  start(cracoConfig);
});
