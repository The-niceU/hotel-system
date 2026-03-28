# 发布到 GitHub 前的最后检查

## 已生成的文件清单

| 文件名                     | 说明             | 位置        |
| -------------------------- | ---------------- | ----------- |
| ✅ `.gitignore`            | Git 忽略文件配置 | 根目录      |
| ✅ `README.md`             | 项目完整说明文档 | 根目录      |
| ✅ `DATABASE_SETUP.md`     | 数据库设置指南   | 根目录      |
| ✅ `DEPLOYMENT.md`         | 生产部署指南     | 根目录      |
| ✅ `CONTRIBUTING.md`       | 贡献指南         | 根目录      |
| ✅ `LICENSE`               | MIT 开源协议     | 根目录      |
| ✅ `db.properties.example` | 数据库配置示例   | src/config/ |

## 发布前需要做的事

### 1. 清理项目目录

```cmd
# 删除编译输出
rmdir /s /q build
rmdir /s /q classes
rmdir /s /q WebContent\WEB-INF\classes
rmdir /s /q WebContent\WEB-INF\lib
```

### 2. 检查敏感信息

**务必确保以下文件中没有真实的数据库密码或密钥：**

- ✅ `src/config/db.properties` - 改为示例值或使用环境变量
- ✅ `.idea/` 文件夹 - 不需要上传（已在 .gitignore 中）
- ✅ 检查代码中是否有硬编码密码

### 3. 验证配置示例

确保 `src/config/db.properties.example` 包含所有配置项但使用占位符值：

```properties
datasource.connection.url=jdbc:mysql://localhost:3306/db_hotel_ssm
datasource.connection.username=root
datasource.connection.password=your_password_here  # ← 使用占位符
```

### 4. 创建 .gitignore 后验证

创建 .gitignore 后，清除 Git 缓存以确保大文件不被跟踪：

```cmd
git rm -r --cached .
git add .
git commit -m "chore: remove ignored files"
```

### 5. 修改 db.properties 为安全配置

编辑 `src/config/db.properties`，确保使用安全的默认值：

```properties
datasource.connection.driver_class=com.mysql.cj.jdbc.Driver
datasource.connection.url=jdbc:mysql://localhost:3306/db_hotel_ssm?useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT%2B8
datasource.connection.username=root
datasource.connection.password=123456  # ⚠️ 改为通用默认值，用户使用时自行修改
```

## GitHub 推送步骤

### 1. 初始化 Git（如果还没做）

```cmd
cd d:\桌面\软工\软件源码\HotelSSM
git init
git add .
git commit -m "Initial commit: Hotel SSM project"
```

### 2. 在 GitHub 创建仓库

- 访问 https://github.com/new
- 创建名为 `HotelSSM` 的仓库（不要初始化 README）

### 3. 添加远程仓库并推送

```cmd
git remote add origin https://github.com/yourusername/HotelSSM.git
git branch -M main
git push -u origin main
```

## 文档导航建议

在 README.md 顶部添加导航链接，让用户快速找到相关文档：

```markdown
[快速开始](#快速开始) | [数据库设置](DATABASE_SETUP.md) | [部署指南](DEPLOYMENT.md) | [贡献指南](CONTRIBUTING.md)
```

## 发布完成后

### 1. 添加 GitHub 标签（Topics）

在仓库设置中添加标签：

- `ssm`
- `java-web`
- `hotel-management`
- `spring`
- `mybatis`
- `mysql`
- `jsp`

### 2. 配置重要设置

- 启用 Discussions（讨论区）
- 启用 Issues
- 设置 Pull Request 模板
- 添加 SECURITY.md（安全政策）

### 3. 优化仓库

- 添加仓库描述
- 设置合适的主题
- 添加 Wiki（可选）
- 定期更新

## 预期目录结构

推送到 GitHub 后，你的仓库应该如下所示：

```
HotelSSM/
├── .gitignore
├── .github/              # GitHub 工作流（可选）
├── src/
│   ├── com/ischoolbar/programmer/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── dao/
│   │   ├── entity/
│   │   └── ...
│   └── config/
│       ├── db.properties
│       ├── db.properties.example
│       ├── log4j.properties
│       ├── spring/
│       ├── springmvc/
│       └── mybatis/
├── WebContent/
│   ├── index.jsp
│   ├── resources/
│   │   ├── admin/
│   │   ├── home/
│   │   └── upload/
│   └── WEB-INF/
│       ├── web.xml
│       └── views/
├── db_hotel_ssm.sql
├── HotelSSM.iml
├── README.md
├── DATABASE_SETUP.md
├── DEPLOYMENT.md
├── CONTRIBUTING.md
└── LICENSE
```

## 完成检查清单

- [ ] 删除了 build/ 和 classes/ 目录
- [ ] 检查了所有敏感信息已移除
- [ ] 创建了 .gitignore 文件
- [ ] 创建了所有文档文件
- [ ] 修改了 db.properties 使用安全值
- [ ] 创建了 LICENSE 文件
- [ ] 在 GitHub 创建了仓库
- [ ] 推送了代码到 GitHub
- [ ] 验证了仓库可以正常浏览
- [ ] 添加了 GitHub 标签（Topics）

---

**现在你的项目已经做好发布准备了！** 🎉

需要帮助吗？查看上面生成的文档：

- 用户使用：参考 `README.md`
- 数据库配置：参考 `DATABASE_SETUP.md`
- 生产部署：参考 `DEPLOYMENT.md`
- 代码贡献：参考 `CONTRIBUTING.md`
