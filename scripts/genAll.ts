const runScriptWithHints = require('./runScriptWithHints');
const genExportFile = require('./genExportFile');

runScriptWithHints(() => genExportFile(), '将 src 下所有文件导出到 index.ts 文件');
