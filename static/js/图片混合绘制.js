const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brushSizeInput = document.getElementById('brushSize');
const brushSizeValue = document.getElementById('brushSizeValue');

let image1 = new Image();
let image2 = new Image();
let isDrawing = false;

const cursor = document.getElementById('cursor');

// 更新画笔大小显示和鼠标指示器大小
brushSizeInput.addEventListener('input', function () {
    const size = this.value;
    brushSizeValue.textContent = size + 'px';
    cursor.style.width = size + 'px';
    cursor.style.height = size + 'px';
});

// 鼠标进入画布时显示自定义指示器
canvas.addEventListener('mouseenter', function () {
    if (image1.src) { // 只在有图片时显示指示器
        cursor.style.display = 'block';
    }
});

// 鼠标离开画布时隐藏自定义指示器
canvas.addEventListener('mouseleave', function () {
    cursor.style.display = 'none';
});

// 更新鼠标指示器位置
canvas.addEventListener('mousemove', function (e) {
    if (image1.src) { // 只在有图片时更新指示器位置
        const rect = canvas.getBoundingClientRect();
        // 计算缩放比例
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        // 计算实际坐标
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    }
});

// 更新文件名显示
document.getElementById('image1').addEventListener('change', function (e) {
    const fileName = e.target.files[0]?.name || '未选择文件';
    document.getElementById('fileName1').textContent = fileName;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        image1.src = event.target.result;
        image1.onload = function () {
            drawImages();
            enableDownloadButton();
            cursor.style.width = brushSizeInput.value + 'px';
            cursor.style.height = brushSizeInput.value + 'px';
        };
    };
    reader.readAsDataURL(file);
});

document.getElementById('image2').addEventListener('change', function (e) {
    const fileName = e.target.files[0]?.name || '未选择文件';
    document.getElementById('fileName2').textContent = fileName;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        image2.src = event.target.result;
        image2.onload = function () {
            drawImages();
        };
    };
    reader.readAsDataURL(file);
});

// 绘制图片
function drawImages() {
    // 调整canvas大小以适应图片
    if (image1.width && image1.height) {
        canvas.width = image1.width;
        canvas.height = image1.height;
    }
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
}

// 鼠标事件处理
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    if (image2.src) {
        cursor.style.borderColor = '#ff0000'; // 绘制时改变边框颜色
        draw(e);
    }
}

function draw(e) {
    if (!isDrawing || !image2.src) return;

    const rect = canvas.getBoundingClientRect();
    // 计算缩放比例
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    // 计算实际坐标
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const brushSize = parseInt(brushSizeInput.value);

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(image2, 0, 0, canvas.width, canvas.height);
    ctx.restore();
}

function stopDrawing() {
    isDrawing = false;
    cursor.style.borderColor = '#000000'; // 停止绘制时恢复边框颜色
}

// 下载按钮功能
const downloadButton = document.getElementById('downloadButton');

// 当上传图片时启用下载按钮
function enableDownloadButton() {
    downloadButton.disabled = false;
}

// 下载功能
downloadButton.addEventListener('click', function () {
    // 创建临时链接
    const link = document.createElement('a');
    // 获取当前时间戳作为文件名的一部分
    const timestamp = new Date().getTime();
    // 设置下载文件名
    link.download = `${timestamp}.png`;
    // 将画布内容转换为数据URL
    link.href = canvas.toDataURL('image/png');
    // 触发下载
    link.click();
});

// 重置按钮功能
document.getElementById('resetButton').addEventListener('click', function () {
    if (image1.src) {
        drawImages();
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        downloadButton.disabled = true;
        cursor.style.display = 'none'; // 隐藏指示器
    }
});