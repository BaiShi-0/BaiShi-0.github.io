[toc]

# poetry



## 配置

### 查看所有配置

```bash
poetry config --list
```

### 虚拟环境在项目目录中

配置全局设置，让虚拟环境存储在项目目录内：

```bash
poetry config virtualenvs.in-project true
```

### 配置镜像源

```bash
poetry config pypi-mirror https://pypi.tuna.tsinghua.edu.cn/simple
```



## 初始化

### 创建新项目

```bash
poetry new my-project
```

会生成如下的目录结构：

```text
my-project/
├── README.md        # 项目说明
├── pyproject.toml   # 项目配置
├── my_project/      # 代码目录
│   └── __init__.py
└── tests/           # 测试目录
    └── __init__.py

```

### 使用现有项目

```bash
cd existed-project
poetry init
```

先进入项目所在目录，再初始化；之后会通过命令行交互配置项目 `pyproject.toml` 。



## 依赖管理

### 添加依赖

通过 `poetry add` 添加依赖，添加时会同步更新 `pyproject.toml`  和  `poetry.lock`  。

例如安装 `requests`:

```bash
poetry add requests
```

指定版本：

```bash
poetry add requests@^2.28.0
```

仅添加到开发环境（比如仅用于测试）：

```bash
poetry add pytest --group dev
```

### 删除依赖

```bash
poetry remove requests
```

###  查看依赖

列出所有已安装的依赖

```bash
poetry  show
```

以树图形式查看依赖

```bash
poetry show --tree
```

### 锁定依赖

Poetry 使用 `poetry.lock` 文件锁定依赖的确切版本，确保一致性。

更新锁文件：

```bash
poetry lock
```

更新依赖到最新兼容版本：

```bash
poetry update
```



## 虚拟环境管理

### 激活和退出

```bash
poetry shell
```

```bash
exit
```

### 检查环境

查看当前虚拟环境信息：

```bash
poetry env info
```

列出所有虚拟环境：

```bash
poetry env list
```

删除虚拟环境：

```bash
poetry env remove python3.10
```



## 其他

### 升级poetry

```bash
poetry self update
```

### 使用特定版本python

如果系统中安装了多个 Python 版本，可以指定 Poetry 使用的版本：

```bash
poetry env use python3.10
```

### 导出 requirements.txt

```bash
poetry export -f requirements.txt --output requirements.txt
```
