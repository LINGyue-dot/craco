import fs from 'fs';
import { log } from './logger';

// process.cwd return nodejs terminal 执行的路径
export const projectRoot = fs.realpathSync(process.cwd());

// __dirname 返回当前文件所在的位置

log('Project root path resolved to: ', projectRoot);
