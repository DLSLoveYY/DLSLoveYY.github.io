
(function () {
    const musicSrc = "../music/bgm.mp3"; // ✅ 正确的音乐路径
    const imageSrc = "../img/als.jpg";     // ✅ 正确的唱片图片路径

    const audio = document.createElement("audio");
    audio.id = "bgm";
    audio.src = musicSrc;
    audio.loop = true;
    audio.controls = true;
    audio.preload = "auto";
    audio.volume = 0.1;

    // 播放器容器
    const container = document.createElement("div");
    container.id = "bgm-container";
    Object.assign(container.style, {
        position: "fixed",
        bottom: "10px", // ← 改为顶部显示
        right: "10px",
        zIndex: "9999",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: "12px",
        padding: "6px 10px",
        boxShadow: "0 0 8px rgba(0,0,0,0.2)",
        backdropFilter: "blur(6px)"
    });

    // 唱片图片
    const disk = document.createElement("img");
    disk.src = imageSrc;
    disk.alt = "music";
    disk.id = "bgm-disk";
    Object.assign(disk.style, {
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        objectFit: "cover",
        transition: "transform 0.3s ease",
        cursor: "pointer"
    });

    // 播放动画
    const style = document.createElement("style");
    style.innerHTML = `
    @keyframes rotateDisk {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    #bgm-disk.playing {
        animation: rotateDisk 20s linear infinite;
    }
    `;
    document.head.appendChild(style);

    // 添加播放信息
        const info = document.createElement("div");
        info.id = "bgm-info";
        Object.assign(info.style, {
            fontSize: "13px",
            color: "#dddddd",
            fontWeight: "500",
            marginTop: "8px",
            textAlign: "center",
            width: "100%",
            opacity: "0.95",
            whiteSpace: "nowrap",
            position: "relative",
        });



    // 歌曲详情弹出框
    const detailBox = document.createElement("div");
    detailBox.id = "bgm-detail-box";
    detailBox.style.display = "none";
    Object.assign(detailBox.style, {
        marginTop: "6px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "10px",
        padding: "8px 12px",
        fontSize: "12px",
        lineHeight: "1.5",
        zIndex:"9999",
        color: "#dddddd",
        boxShadow: "0 0 6px rgba(0,0,0,0.2)",
        backdropFilter: "blur(4px)",
        textAlign: "left",
        maxWidth: "220px"
    });
    detailBox.innerHTML = `
        <strong>🎵 歌曲信息</strong><br>
        AI爱丽丝---《坎农》<br>
        声音归属：天童アリス（CV：田中美海）<br>
        音声来源：坎农 - 《坎公骑冠剑》两周年纪念曲<br>
        项目地址：https://github.com/innnky/so-vits-svc
    `;

    
       // 播放器结构
        container.appendChild(disk);
        container.appendChild(audio);
        
        // detailBox 添加到播放器容器中（随播放器一起固定）
        container.appendChild(detailBox);
        
        // 创建 wrapper 并挂到右上角
        const wrapper = document.createElement("div");
        Object.assign(wrapper.style, {
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: "9999",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        });
        wrapper.appendChild(container);
        document.body.appendChild(wrapper);
        
        // info 独立挂载（不在 wrapper 中）
        document.body.appendChild(info);
        
        // 设置 info 额外位置（位于播放器下方）
        Object.assign(info.style, {
            position: "fixed",
            top: "75px",  // ⬅️ 距离顶部留出播放器高度（可根据播放器高度调整）
            right: "-400px",
            zIndex: "9998"
        });



    // 音量恢复
    const savedVolume = localStorage.getItem("bgm_volume");
    if (savedVolume !== null) {
        audio.volume = parseFloat(savedVolume);
    }

    // 旋转控制
    function updateDiskRotation() {
        if (audio.paused) {
            disk.classList.remove("playing");
        } else {
            disk.classList.add("playing");
        }
    }

    // 播放状态恢复
    const savedPaused = localStorage.getItem("bgm_paused");
    if (savedPaused === "true") {
        audio.pause();
    } else {
        audio.play().catch(err => {
            console.warn("自动播放失败：", err.message);
        });
    }

    updateDiskRotation();

    // 状态监听器
    audio.addEventListener("volumechange", () => {
        localStorage.setItem("bgm_volume", audio.volume);
    });
    audio.addEventListener("play", () => {
        localStorage.setItem("bgm_paused", "false");
        updateDiskRotation();
    });
    audio.addEventListener("pause", () => {
        localStorage.setItem("bgm_paused", "true");
        updateDiskRotation();
    });

    // 💡 点击图片切换显示详情
    let detailVisible = false;
    disk.addEventListener("click", () => {
        detailVisible = !detailVisible;
        detailBox.style.display = detailVisible ? "block" : "none";
    });

})();
