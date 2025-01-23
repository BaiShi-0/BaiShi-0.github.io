// 检查浏览器是否支持必要的API
function checkBrowserSupport() {
    const requirements = {
        FileReader: typeof FileReader !== 'undefined',
        Blob: typeof Blob !== 'undefined',
        Promise: typeof Promise !== 'undefined',
        Canvas: !!document.createElement('canvas').getContext
    };

    const unsupported = Object.entries(requirements)
        .filter(([, supported]) => !supported)
        .map(([feature]) => feature);

    if (unsupported.length > 0) {
        alert(`您的浏览器不支持以下特性：${unsupported.join(', ')}\n请使用最新版本的Chrome、Firefox、Safari或Edge浏览器。`);
        return false;
    }
    return true;
}

// 添加调整图片尺寸的函数
async function resizeImage(originalCanvas, width, height) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    // 使用双线性插值实现更好的缩放质量
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(originalCanvas, 0, 0, width, height);
    return canvas;
}

// 添加计算等比例尺寸的函数
function calculateAspectRatio(originalWidth, originalHeight, newWidth = null, newHeight = null) {
    if (!newWidth && !newHeight) {
        return { width: originalWidth, height: originalHeight };
    }

    const ratio = originalWidth / originalHeight;

    if (newWidth && !newHeight) {
        // 只设置宽度，按比例计算高度
        return {
            width: newWidth,
            height: Math.round(newWidth / ratio)
        };
    } else if (!newWidth && newHeight) {
        // 只设置高度，按比例计算宽度
        return {
            width: Math.round(newHeight * ratio),
            height: newHeight
        };
    } else {
        // 同时设置宽度和高度，使用指定值
        return {
            width: newWidth,
            height: newHeight
        };
    }
}

// 修改图片转换函数
async function convertToImage(canvas, targetWidth = null, targetHeight = null) {
    try {
        const dimensions = calculateAspectRatio(
            canvas.width,
            canvas.height,
            targetWidth ? parseInt(targetWidth) : null,
            targetHeight ? parseInt(targetHeight) : null
        );

        // 只有在尺寸发生变化时才进行调整
        if (dimensions.width !== canvas.width || dimensions.height !== canvas.height) {
            canvas = await resizeImage(canvas, dimensions.width, dimensions.height);
        }

        return new Promise((resolve, reject) => {
            if (canvas.toBlob) {
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    resolve(url);
                }, 'image/png');
            } else {
                const dataUrl = canvas.toDataURL('image/png');
                resolve(dataUrl);
            }
        });
    } catch (error) {
        throw error;
    }
}

// 添加文件信息显示函数
function showFileInfo(file) {
    const fileInfo = document.getElementById('file-info');
    const size = (file.size / 1024 / 1024).toFixed(2); // 转换为MB并保留两位小数

    fileInfo.innerHTML = `
        <p class="file-name">文件名：${file.name}</p>
        <p class="file-size">大小：${size} MB</p>
    `;
    fileInfo.classList.add('active');
}

// 主要处理函数
async function handlePdfConversion(file) {
    const preview = document.getElementById('preview');
    preview.innerHTML = ''; // 只清空预览区域

    // 显示文件信息
    showFileInfo(file);

    try {
        const arrayBuffer = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });

        const loadingTask = pdfjsLib.getDocument(new Uint8Array(arrayBuffer));
        const pdf = await loadingTask.promise;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            try {
                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;

                const imageUrl = await convertToImage(canvas);

                // 创建预览容器
                const previewContainer = document.createElement('div');
                previewContainer.className = 'page-container';

                const pageTitle = document.createElement('h3');
                pageTitle.textContent = `第 ${pageNum} 页`;
                previewContainer.appendChild(pageTitle);

                const image = document.createElement('img');
                image.src = imageUrl;
                image.className = 'preview-image';
                image.alt = `PDF第${pageNum}页预览`;
                previewContainer.appendChild(image);

                // 创建下载控制容器
                const downloadContainer = document.createElement('div');
                downloadContainer.className = 'download-container';

                // 创建尺寸输入组
                const sizeGroup = document.createElement('div');
                sizeGroup.className = 'size-input-group';

                const widthInput = document.createElement('input');
                widthInput.type = 'number';
                widthInput.className = 'size-input';
                widthInput.value = canvas.width;
                widthInput.min = '1';
                widthInput.placeholder = '宽度';

                const heightInput = document.createElement('input');
                heightInput.type = 'number';
                heightInput.className = 'size-input';
                heightInput.value = canvas.height;
                heightInput.min = '1';
                heightInput.placeholder = '高度';

                sizeGroup.innerHTML = `
                    <span class="size-label">尺寸:</span>
                    ${widthInput.outerHTML}
                    <span class="size-label">×</span>
                    ${heightInput.outerHTML}
                    <span class="size-label">px</span>
                `;

                // 添加下载按钮
                const downloadBtn = document.createElement('a');
                downloadBtn.href = imageUrl;
                downloadBtn.download = `page-${pageNum}.png`;
                downloadBtn.textContent = `下载第 ${pageNum} 页`;
                downloadBtn.className = 'download-btn';

                // 添加尺寸变化监听
                downloadContainer.appendChild(sizeGroup);
                downloadContainer.appendChild(downloadBtn);

                // 当尺寸输入改变时更新下载链接
                downloadContainer.querySelector('input[placeholder="宽度"]').addEventListener('change', async function () {
                    const width = this.value ? parseInt(this.value) : null;
                    const heightInput = this.nextElementSibling.nextElementSibling;
                    const height = heightInput.value ? parseInt(heightInput.value) : null;

                    if (width === null && height === null) {
                        // 都为空时使用原始尺寸
                        const newUrl = await convertToImage(canvas);
                        downloadBtn.href = newUrl;
                    } else if (width <= 0 || height <= 0) {
                        alert('请输入有效的尺寸值');
                        this.value = canvas.width;
                        heightInput.value = canvas.height;
                    } else {
                        const newUrl = await convertToImage(canvas, width, height);
                        downloadBtn.href = newUrl;
                    }
                });

                downloadContainer.querySelector('input[placeholder="高度"]').addEventListener('change', async function () {
                    const height = this.value ? parseInt(this.value) : null;
                    const widthInput = this.previousElementSibling.previousElementSibling;
                    const width = widthInput.value ? parseInt(widthInput.value) : null;

                    if (width === null && height === null) {
                        // 都为空时使用原始尺寸
                        const newUrl = await convertToImage(canvas);
                        downloadBtn.href = newUrl;
                    } else if (width <= 0 || height <= 0) {
                        alert('请输入有效的尺寸值');
                        widthInput.value = canvas.width;
                        this.value = canvas.height;
                    } else {
                        const newUrl = await convertToImage(canvas, width, height);
                        downloadBtn.href = newUrl;
                    }
                });

                // 添加一个重置尺寸的按钮
                const resetBtn = document.createElement('button');
                resetBtn.textContent = '重置尺寸';
                resetBtn.className = 'reset-btn';
                resetBtn.onclick = async function () {
                    const widthInput = downloadContainer.querySelector('input[placeholder="宽度"]');
                    const heightInput = downloadContainer.querySelector('input[placeholder="高度"]');
                    widthInput.value = canvas.width;
                    heightInput.value = canvas.height;
                    const newUrl = await convertToImage(canvas);
                    downloadBtn.href = newUrl;
                };
                sizeGroup.appendChild(resetBtn);

                previewContainer.appendChild(downloadContainer);
                preview.appendChild(previewContainer);
            } catch (error) {
                console.error(`渲染第${pageNum}页时出错:`, error);
                const errorMsg = document.createElement('p');
                errorMsg.textContent = `第${pageNum}页渲染失败`;
                errorMsg.style.color = 'red';
                preview.appendChild(errorMsg);
            }
        }
    } catch (error) {
        console.error('PDF处理错误:', error);
        alert('PDF处理失败，请重试。错误信息：' + error.message);
    }
}

// 添加拖拽支持
function initializeDropZone() {
    const dropZone = document.querySelector('.upload-container');
    const fileInput = document.getElementById('pdfFile');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('upload-container-active');
    }

    function unhighlight(e) {
        dropZone.classList.remove('upload-container-active');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const file = dt.files[0];

        if (file && file.type === 'application/pdf') {
            fileInput.files = dt.files;
            handlePdfConversion(file);
        } else {
            alert('请选择PDF文件');
            document.getElementById('file-info').classList.remove('active');
        }
    }
}

// 在初始化时调用
if (checkBrowserSupport()) {
    // 设置pdf.js的worker路径
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

    const fileInput = document.getElementById('pdfFile');
    fileInput.addEventListener('change', async function (e) {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            await handlePdfConversion(file);
        } else {
            alert('请选择PDF文件');
            document.getElementById('file-info').classList.remove('active');
        }
    });

    // 初始化拖拽区域
    initializeDropZone();
} else {
    document.body.innerHTML = '<h1>浏览器不支持</h1><p>请使用最新版本的Chrome、Firefox、Safari或Edge浏览器。</p>';
} 