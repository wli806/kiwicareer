const fs = require('fs');
const path = require('path');

const logoDir = path.join(__dirname, '../public/assets/logo'); // 确保路径正确
const outputFile = path.join(__dirname, 'generated_companies.js'); // 生成的 JS 文件

// 读取 logo 文件夹下的所有文件
fs.readdir(logoDir, (err, files) => {
    if (err) {
        console.error('读取 logo 目录失败:', err);
        return;
    }

    // 过滤出图片文件
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp'];
    const companyData = files
        .filter(file => imageExtensions.includes(path.extname(file).toLowerCase())) // 只保留图片文件
        .map(file => {
            const companyName = path.basename(file, path.extname(file)); // 去掉后缀
            return {
                name: companyName.replace(/_/g, ' '), // 替换 `_` 为 ` `
                logo: `/assets/logo/${file}` // 生成前端可访问的路径
            };
        });

    // 生成 SQL 语句
    const sqlStatements = companyData.map(({ name, logo }) => 
        `INSERT INTO Companies (name, logo) VALUES ('${name}', '${logo}');`
    ).join('\n');

    // 生成 JavaScript 代码
    const jsContent = `// 生成的公司数据插入 SQL 语句
const companyInsertSQL = \`
${sqlStatements}
\`;

module.exports = { companyInsertSQL };
`;

    // 写入 `generated_companies.js`
    fs.writeFile(outputFile, jsContent, (err) => {
        if (err) {
            console.error('写入文件失败:', err);
        } else {
            console.log('SQL 语句已生成，保存在:', outputFile);
        }
    });
});
