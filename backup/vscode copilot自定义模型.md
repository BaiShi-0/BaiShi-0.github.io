
## 前提条件

先在vscode中安装copilot，并保证其能够正常使用！！



## 使用方法

### vscode下载插件

![image-20251105160820201](https://img2024.cnblogs.com/blog/3293182/202511/3293182-20251111173132030-77129592.png)



### 打开vscode用户的setting.json

`ctrl+shift+p` 打开上方命令后，按照下图操作：

![image-20251105161043692](https://img2024.cnblogs.com/blog/3293182/202511/3293182-20251111173132648-1130604014.png)

将以下代码复制到打开的json的最后：

```
    "oaicopilot.baseUrl": "https://open.bigmodel.cn/api/paas/v4",
	"oaicopilot.models": [
        {
            "id": "glm-4.5-flash",
            "family": "glm",
            "baseUrl": "https://open.bigmodel.cn/api/paas/v4",
            "owned_by": "bigmodel",
            "context_length": 128000,
            "max_tokens": 96000,
            "max_completion_tokens": 96000,
            "enable_thinking": true,
            "temperature": 0.5,
            "repetition_penalty": 1.2
        },
    ],
```

ps: 至于为什么这么写，看插件作者的仓库 [JohnnyZ93/oai-compatible-copilot](https://github.com/JohnnyZ93/oai-compatible-copilot)



### apikey获取

[智谱AI开放平台](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys) 

登录后按如下操作得到apikey
![image-20251105160523116](https://img2024.cnblogs.com/blog/3293182/202511/3293182-20251111173133039-1202103316.png)





### 使用apikey

依旧是`ctrl+shift+p`打开命令，然后按如下操作：
![image-20251105161754740](https://img2024.cnblogs.com/blog/3293182/202511/3293182-20251111173133406-869069687.png)

选择`bigmodel`:

![image-20251105161828865](https://img2024.cnblogs.com/blog/3293182/202511/3293182-20251111173133786-1611108335.png)

粘贴刚刚复制的apikey：

![image-20251105161916633](https://img2024.cnblogs.com/blog/3293182/202511/3293182-20251111173134160-1483112865.png)



## 使用模型

![image-20251105162000900](https://img2024.cnblogs.com/blog/3293182/202511/3293182-20251111173134530-537108722.png)

![image-20251105162013319](https://img2024.cnblogs.com/blog/3293182/202511/3293182-20251111173134975-1858499374.png)

把需要的模型打开选上就行了

![image-20251105162030681](https://img2024.cnblogs.com/blog/3293182/202511/3293182-20251111173135881-373459992.png)

之后就能正常使用了：

![image-20251105162137923](https://img2024.cnblogs.com/blog/3293182/202511/3293182-20251111173136243-1447566932.png)

