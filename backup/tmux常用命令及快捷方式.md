## 安装

### Ubuntu

```bash
sudo apt-get install tmux
```

 ### CentOS
```bash
sudo yum install tmux
```

### Mac
```bash
brew install tmux
```



## 常用命令及快捷键

### 查看所有会话

```bash
tmux ls
```

**快捷键：**`Ctrl+b s`

### 新建窗口

```bash
tmux new -s <session-name>
```

### 重命名会话

```bash
tmux rename-session -t <old-name> <new-name>
```

**快捷键：**`Ctrl+b $`

### 分离会话

```bash
tmux detach  或者使用  exit(关闭窗口)
```

**快捷键：**`Ctrl+b d`

### 重新连接会话

```bash
tmux attach -t <session-name>
```

```bash
tmux at -t <session-name>
```

### 平铺当前窗格

**快捷键：**`Ctrl+b z` (再次点击恢复)

### 杀死会话

```bash
tmux kill-session -t <session-name>
```

### 切换会话

```bash
tmux switch -t <session-name>
```

### 划分上下两个窗格

```bash
tmux split
```

**快捷键：**`Ctrl+b "`

### 划分左右两个窗格

```bash
tmux split -h
```

**快捷键：**`Ctrl+b %`

### 光标切换到其他窗格

```bash
tmux select-pane -U
tmux select-pane -D
tmux select-pane -L
tmux select-pane -R
```

**快捷键：**`Ctrl+b ↑/↓/←/→` （方向键 上下左右）



## 常用快捷键

先按下`Ctrl+b`，再按下以下键后对应功能生效

### 系统操作

| 按键   | 效果                                                         |
| ------ | ------------------------------------------------------------ |
| ?      | 列出所有快捷键；按q返回                                      |
| d      | 脱离当前会话；这样可以暂时返回Shell界面，输入tmux attach能够重新进入之前的会话 |
| D      | 选择要脱离的会话；在同时开启了多个会话时使用                 |
| Ctrl+z | 挂起当前会话                                                 |
| r      | 强制重绘未脱离的会话                                         |
| s      | 选择并切换会话；在同时开启了多个会话时使用                   |
| :      | 进入命令行模式；此时可以输入支持的命令，例如kill-server可以关闭服务器 |
| [      | 进入复制模式；此时的操作与vi/emacs相同，按q/Esc退出          |
| ~      | 列出提示信息缓存；其中包含了之前tmux返回的各种提示信息       |

### 窗口操作

| 按键   | 效果                                 |
| ------ | ------------------------------------ |
| c      | 创建新窗口                           |
| &      | 关闭当前窗口                         |
| 数字键 | 切换至指定窗口                       |
| p      | 切换至上一窗口                       |
| n      | 切换至下一窗口                       |
| l      | 在前后两个窗口间互相切换             |
| w      | 通过窗口列表切换窗口                 |
| ,      | 重命名当前窗口；这样便于识别         |
| .      | 修改当前窗口编号；相当于窗口重新排序 |
| f      | 在所有窗口中查找指定文本             |

### 面板操作

| 按键        | 效果                                                         |
| ----------- | ------------------------------------------------------------ |
| ”           | 将当前面板平分为上下两块                                     |
| %           | 将当前面板平分为左右两块                                     |
| x           | 关闭当前面板                                                 |
| !           | 将当前面板置于新窗口；即新建一个窗口，其中仅包含当前面板     |
| Ctrl+方向键 | 以1个单元格为单位移动边缘以调整当前面板大小                  |
| Alt+方向键  | 以5个单元格为单位移动边缘以调整当前面板大小                  |
| Space       | 在预置的面板布局中循环切换；依次包括even-horizontal、even-vertical、main-horizontal、main-vertical、tiled |
| q           | 显示面板编号                                                 |
| o           | 在当前窗口中选择下一面板                                     |
| 方向键      | 移动光标以选择面板                                           |
| {           | 向前置换当前面板                                             |
| }           | 向后置换当前面板                                             |
| Alt+o       | 逆时针旋转当前窗口的面板                                     |
| Ctrl+o      | 顺时针旋转当前窗口的面板                                     |