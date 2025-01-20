## 更新包管理器

```bash
sudo apt update
```

## 安装Docker的依赖包

```bash
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release
```

## 添加 Docker GPG 密钥：

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

## 添加 Docker apt 仓库：

```bash
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

## 更新 apt 缓存：

```bash
sudo apt update
```

## 安装 Docker

```bash
sudo apt install docker-ce docker-ce-cli containerd.io
```

## 启动 Docker 服务：

```bash
sudo systemctl start docker
```

## 确认 Docker 已经正确安装：

```bash
sudo docker run hello-world
```

>  这个命令会从 Docker Hub 上下载一个测试镜像并运行它。如果 Docker 正确安装，会显示一些信息并打印一条消息说 “Hello from Docker!”。