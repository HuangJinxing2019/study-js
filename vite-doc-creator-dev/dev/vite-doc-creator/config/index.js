const { createServer } = require('vite')
const { resolve } = require('path');

// 默认端口号createServer

const port = process.env.npm_config_port;

// 默认域名
const domain = 'http://localhost';

// 默认标题
const title = '这是一个轻快的文档生成器'

/**
 * 项目目录体系
 * src ->
 *     css ->
 *     js ->
 *     html -> md -> html
 *  workspace -> 编辑markdown
 *  index.html
 */
const outPath = {
    rootPath: resolve(__dirname, '../../../'),
    srcPath: resolve(__dirname, '../../../src/'),
    htmlPath: resolve(__dirname, '../../../src/html/'),
    cssPath: resolve(__dirname, '../../../src/css/'),
    jsPath: resolve(__dirname, '../../../src/js/'),
    mdPath: resolve(__dirname, '../../../workspace/'),
}

/**
 * 插件目录体系
 * temp_files
 *     css ->
 *     js ->
 *     html -> index.html/md.html/welcome.html
 */
const innerDir = {
    rootDir: resolve(__dirname, '../temp_files/'),
    cssDir: resolve(__dirname, '../temp_files/css/'),
    htmlDir: resolve(__dirname, '../temp_files/html/'),
    jsDir: resolve(__dirname, '../temp_files/js/'),
}

const regexp = {
    // 匹配ul menu-list内部的内容
    reg_ulContent: /<ul class=\"menu-list\">([\s\S]*?)<\/ul>/,
    // 匹配title中的内容
    reg_titleContent: /<title>([\s\S]*?)<\/title>/,
    // 匹配header-title中的内容
    reg_headerTitleContent: /<h1 class=\"header-title\">([\s\S]*?)<\/h1>/,
    // 匹配iframe page中的内容
    reg_iframePageContent: /<div class=\"iframe-page\">([\s\S]*?)<\/div>/
}

module.exports = {
    port,
    domain,
    title,
    outPath,
    innerDir,
    regexp
}
