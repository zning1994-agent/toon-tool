# toonjs / CLI

TOON 格式的命令行工具集。

## 安装

```bash
npm install -g toonjs
```

或者不安装，直接用 npx：

```bash
npx toonjs tojson input.toon
```

## 命令

### `toon tojson [file]`

TOON → JSON 转换。

```bash
toon tojson config.toon
echo "name: test" | toon tojson
toon tojson data.toon -o output.json
```

### `toon json [file]`

JSON → TOON 转换。

```bash
toon json package.json
echo '{"name":"test","v":1}' | toon json
toon json input.json -o output.toon
```

### `toon validate [file]`

TOON 语法检查。

```bash
toon validate config.toon
echo "name: test" | toon validate
toon validate -j data.json   # 验证 JSON
```

检查项目：
- 未闭合的引号
- 同缩进级别重复 key
- 数组声明大小与实际值数量不匹配
- 空 key
- 括号不匹配

### `toon diff <file1> <file2>`

对比两个文件（自动识别 toon/json，按语义 normalize 后对比）。

```bash
toon diff a.toon b.toon
toon diff old.json new.json
toon diff a.toon b.json
```

## 全部命令

```
toon tojson [file]       TOON → JSON
toon json [file]         JSON → TOON
toon validate [file]     验证 TOON 语法
toon diff <f1> <f2>      对比两个文件
toon --version           版本
toon --help              帮助
```

## 构建

```bash
npm install
npm run build
node dist/index.js --help
```

## 发布

```bash
npm login
npm publish --access public
```
