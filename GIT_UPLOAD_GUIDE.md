# 📤 GitHub上传指南

## 仓库信息
- **GitHub仓库**: https://github.com/Furinaaa-Cancan/Character-image-segmentation
- **本地路径**: `/Volumes/Seagate/人物轮廓分割/postercraft-web/`

---

## 🚀 快速上传步骤

### 1. 打开终端

```bash
cd /Volumes/Seagate/人物轮廓分割/postercraft-web
```

### 2. 初始化Git仓库(如果需要)

```bash
# 检查是否已有Git仓库
git status

# 如果提示"not a git repository",则初始化
git init
```

### 3. 配置远程仓库

```bash
# 添加远程仓库
git remote add origin https://github.com/Furinaaa-Cancan/Character-image-segmentation.git

# 或者如果已存在,更新URL
git remote set-url origin https://github.com/Furinaaa-Cancan/Character-image-segmentation.git
```

### 4. 添加所有文件

```bash
# 查看将要提交的文件
git status

# 添加所有文件
git add .

# 或者选择性添加
git add src/ public/ package.json README.md screenshots/
```

### 5. 提交更改

```bash
git commit -m "feat: 完成温暖专业风格UI重新设计

✨ 新功能:
- 重新设计Header导航栏(玻璃态效果)
- 重新设计Hero首屏(居中布局)
- 简化页面结构,只保留核心内容
- 添加完整README文档和项目截图

📝 文档:
- 项目结构整理文档
- 代码优化建议文档
- UI重新设计完成报告
- 代码质量检查报告

🎨 设计:
- 温暖专业配色方案(米色+橘棕)
- 现代化玻璃态设计
- 流畅的Framer Motion动画
- 响应式友好布局

✅ 质量:
- 代码质量评分: 86%
- 安全性: 100%
- TypeScript覆盖: 100%
- 无XSS/注入漏洞"
```

### 6. 推送到GitHub

```bash
# 首次推送(设置上游分支)
git push -u origin main

# 或者如果分支是master
git push -u origin master

# 如果需要强制推送(谨慎使用!)
git push -f origin main
```

---

## 🔐 身份验证

### 方法1: 使用Personal Access Token (推荐)

1. 访问 https://github.com/settings/tokens
2. 生成新的Token (勾选 `repo` 权限)
3. 复制Token
4. 推送时使用Token作为密码

### 方法2: 使用SSH Key

```bash
# 生成SSH密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 复制公钥
cat ~/.ssh/id_ed25519.pub

# 添加到GitHub: https://github.com/settings/keys
```

---

## ⚠️ 常见问题

### 问题1: 推送被拒绝

```bash
# 先拉取远程更改
git pull origin main --rebase

# 再推送
git push origin main
```

### 问题2: 文件太大

```bash
# 检查大文件
find . -type f -size +50M

# 添加到.gitignore
echo "大文件路径" >> .gitignore
```

### 问题3: 合并冲突

```bash
# 查看冲突文件
git status

# 手动解决冲突后
git add .
git commit -m "resolve conflicts"
git push
```

---

## 📋 上传前检查清单

- [ ] 确认.gitignore已配置
- [ ] 确认README.md完整
- [ ] 确认screenshots目录存在
- [ ] 确认没有敏感信息(密码、Token等)
- [ ] 确认node_modules已被忽略
- [ ] 确认.env文件已被忽略

---

## 🎯 推荐的Git工作流

### 日常开发

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 创建功能分支
git checkout -b feature/new-feature

# 3. 开发并提交
git add .
git commit -m "feat: 添加新功能"

# 4. 推送分支
git push origin feature/new-feature

# 5. 在GitHub创建Pull Request
```

### 快速修复

```bash
# 1. 创建修复分支
git checkout -b hotfix/fix-bug

# 2. 修复并提交
git add .
git commit -m "fix: 修复XXX问题"

# 3. 推送并合并
git push origin hotfix/fix-bug
```

---

## 📚 有用的Git命令

```bash
# 查看状态
git status

# 查看提交历史
git log --oneline

# 查看远程仓库
git remote -v

# 撤销最后一次提交(保留更改)
git reset --soft HEAD~1

# 查看差异
git diff

# 暂存更改
git stash

# 恢复暂存
git stash pop
```

---

## 🆘 需要帮助?

- GitHub文档: https://docs.github.com/
- Git教程: https://git-scm.com/book/zh/v2
- 问题反馈: 在仓库创建Issue

---

*生成时间: 2026-02-16*  
*项目: PosterCraft Pro*
