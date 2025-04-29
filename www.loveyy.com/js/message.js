document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("commentForm");
    const commentList = document.getElementById("commentList");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // 阻止默认表单提交

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // 表单验证
        if (name === "" || message === "") {
            alert("请填写昵称和留言内容");
            return;
        }

        // 提交留言到服务器
        fetch("php/submit_comment.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ name, email, message }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("留言成功！");
                form.reset();
                loadComments(); // 重新加载留言
            } else {
                alert("留言失败：" + data.error);
            }
        })
        .catch(err => {
            console.error("提交失败：", err);
            alert("发生错误，无法提交留言");
        });
    });

    // 从后端加载留言
    function loadComments() {
        fetch("php/get_comments.php")
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    commentList.innerHTML = ""; // 清空旧留言
                    data.comments.forEach(c => {
                        const commentItem = document.createElement("div");
                        commentItem.classList.add("comment-item");
                        commentItem.innerHTML = `
                            <p><strong>${escapeHtml(c.name)}</strong> · <small>${escapeHtml(c.created_at)}</small></p>
                            <p>${escapeHtml(c.message)}</p>
                            ${c.email ? `<p class="email">📧 ${escapeHtml(c.email)}</p>` : ""}
                            <hr />
                        `;
                        commentList.appendChild(commentItem);
                    });
                } else {
                    commentList.innerHTML = "<p>留言加载失败：" + data.error + "</p>";
                }
            })
            .catch(err => {
                console.error("留言加载失败：", err);
                commentList.innerHTML = "<p>留言加载失败</p>";
            });
    }
    // 页面加载时自动拉取留言
    loadComments();
    // 防止 XSS 的转义函数（用于安全显示用户留言）
        function escapeHtml(text) {
            return text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
        
document.addEventListener("DOMContentLoaded", function () {
    const trigger = document.querySelector('#emojiBtn');
    if (trigger) {
        trigger.addEventListener('click', () => {
            alert('按钮被点击了！');
        });
    } else {
        console.error('未找到 ID 为 "emojiBtn" 的按钮。');
    }
});

});
