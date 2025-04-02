# 查看

## 查看运行中容器

```bash
docker ps
```



## 查看所有容器

```bash
docker ps -a
```

![屏幕截图](./img/%232-1.png)



## 查看镜像

```bash
docker images
```

![image](./img/%232-2.png)



# 停止容器

```bash
docker stop 容器名/容器ID
```



# 进入容器

## exec

exec生成新终端，使用exit退出时也不会停止容器

```bash
docker exec -it 容器id /bin/bash
```



## attach

attach进入正在运行的终端

如果使用exit退出，容器会停止运行

如果想退出容器但不想容器停止，则按住Ctrl+P+Q退出

```bash
docker attach 容器id
```

# 复制文件

```bash
docker cp 路径1 路径2
```

> [!note]
>
> 路径1:  表示 *本地文件路径* 或 *容器中文件路径*    ./test.txt 或 容器名:文件路径
>
> 路径2:  表示 *本地文件夹路径* 或 *容器中文件夹路径* 



# 删除

## 删除容器

```bash
docker rm 容器名/容器ID
```



## 删除镜像

```bash
docker rmi 镜像名
```



# 查看容器日志

```bash
docker logs 容器名/容器ID
```


