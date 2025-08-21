## 安装

**注意安装环境**

```bash
pip install pyinstaller
```

## 基本使用

1. 直接生成可执行文件：

```bash
pyinstaller script.py
```

2. 分步：

   - 先生成spec配置，生成后可在文件中修改配置

     ```bash
     pyi-makespec script.py
     ```

   - 根据配置生成可执行文件

     ```bash
     pyinstaller script.spec
     ```



## 参数

| 参数                        | 作用                                   |
| --------------------------- | -------------------------------------- |
| -h                          | 该模块的help信息                       |
| -F                          | 生成一个可执行文件(生成单文件)         |
| -D  --ondir                 | 生成一个目录作为可执行文件(生成多文件) |
| -w  --windowed  --noconsole | 运行生成的exe时，不显示命令行窗口      |
| -i  --icon                  | 指定可执行文件的icon图标路径           |
| –distpath                   | 可执行文件的路径                       |
| -n  --name                  | 对可执行文件命名                       |