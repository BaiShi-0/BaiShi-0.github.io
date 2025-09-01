## 服务端准备

### 前提准备

- 有公网ip的服务器
- 服务器开放端口
  - TCP: 21115-21119
  - UDP: 21116

### Docker安装

网上教程很多就不多赘述了~

### 启动服务

创建文件夹，用于存放数据:

```bash
cd ~
mkdir RustDesk
cd RustDesk
```

拉取镜像:

```bash
sudo docker image pull rustdesk/rustdesk-server
```

运行服务：

```bash
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --net=host rustdesk/rustdesk-server hbbs
```

```bash
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --net=host rustdesk/rustdesk-server hbbr
```

### 检查服务

检查服务是否启动成功:

```bash
docker ps -a
```

![image-20250901165831654](https://img2024.cnblogs.com/blog/3293182/202509/3293182-20250901171348822-1499048880.png)

检查文件是否成功创建:

```bash
cd data && ls -l
```

![image-20250901170119697](https://img2024.cnblogs.com/blog/3293182/202509/3293182-20250901171349471-13048053.png)

其中==id_ed25519.pub==就是密钥

## 配置客户端

获取密钥:

```bash
cat id_ed25519.pub
```

得到输出后**复制**后续有用： ==cSfm2yB......== 

安装客户端：[GitHub: rustdesk](https://github.com/rustdesk/rustdesk)

以Windows为例子：

![image-20250901170746723](https://img2024.cnblogs.com/blog/3293182/202509/3293182-20250901171349779-1098011943.png)

![image-20250901170914692](https://img2024.cnblogs.com/blog/3293182/202509/3293182-20250901171350074-2009941852.png)

填入对应内容:

- ID服务器: `ip:21116`
- 中继服务器: `ip:21117`
- API服务器: `http://ip:21118`
- key: `上边复制的密钥`

之后点`确认`即可

## 注意

想要多个客户端直接连接，需要配置每一个客户端