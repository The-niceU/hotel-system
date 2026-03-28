# 贡献指南

感谢你对 Hotel SSM 项目的关注！我们欢迎各种形式的贡献，包括 bug 报告、功能建议和代码提交。

## 行为准则

- 尊重所有参与者
- 友好、包容的社区环境
- 建设性的反馈和讨论
- 遵守项目许可证

## 报告 Bug

### 报告前

- 检查是否已有相同的 Issue
- 更新项目到最新版本
- 检查文档和 FAQ

### 报告方式

创建 Issue 时请包含：

1. **Bug 描述**：简明扼要地说明问题
2. **复现步骤**：详细的步骤来重现 bug
3. **期望行为**：应该发生的情况
4. **实际行为**：实际发生的情况
5. **环境信息**：
   - 操作系统和版本
   - Java 版本
   - MySQL 版本
   - Tomcat 版本
6. **日志信息**：相关的错误日志
7. **截图**：如果适用，请提供截图

### Bug 报告示例

```
标题：[BUG] 订单创建失败 - 中文字符乱码

描述：
当用户预订房间时，输入中文房间类型导致订单创建失败。

复现步骤：
1. 登录到前台预订系统
2. 选择房间类型"豪华套房"
3. 填写订单信息
4. 提交订单

期望行为：
订单应该成功创建，数据库中的中文字符正常显示。

实际行为：
显示错误提示，订单创建失败，数据库中中文显示为 ???。

环境：
- OS: Windows 10
- Java: JDK 1.8.0_281
- MySQL: 8.0.23
- Tomcat: 9.0.43

错误日志：
java.sql.SQLException: Incorrect string value...
```

## 功能建议

### 提交建议

创建 Issue 时请包含：

1. **功能描述**：你想要的功能是什么
2. **使用场景**：这个功能解决了什么问题
3. **可能的实现方案**：你有什么想法吗
4. **相关截图或链接**：如果有参考

### 功能建议示例

```
标题：[FEATURE] 支持短信通知功能

描述：
添加 SMS 通知功能，在订单确认、入住等关键时间点向客户发送短信。

使用场景：
- 订单确认时发送确认短信
- 入住当天发送提醒短信
- 特价活动时发送营销短信

可能的实现方案：
集成第三方短信服务（如阿里云、腾讯云）

参考链接：
https://www.aliyun.com/product/sms
```

## 代码贡献

### 准备工作

1. **Fork 项目**

```bash
git clone https://github.com/yourusername/HotelSSM.git
cd HotelSSM
```

2. **创建功能分支**

```bash
git checkout -b feature/your-feature-name
```

3. **安装开发环境**
   - 配置 JDK 8+
   - 安装 MySQL 5.7+
   - 导入 IDE（Eclipse 或 IntelliJ IDEA）

### 编码规范

#### Java 代码规范

```java
// 1. 类名使用 PascalCase
public class UserController {
    // 2. 方法名和变量名使用 camelCase
    private String userName;

    public String getUserName() {
        return userName;
    }

    // 3. 常量使用 UPPER_SNAKE_CASE
    private static final int MAX_SIZE = 100;

    // 4. 注释要清晰明确
    // 验证用户是否存在
    public boolean userExists(String username) {
        // 实现逻辑
        return false;
    }
}
```

#### 代码风格

- 使用 4 个空格缩进（不使用 Tab）
- 每行最多 120 个字符
- 在逻辑块之间添加空行
- 使用有意义的变量名
- 添加必要的注释和 Javadoc

#### 提交消息规范

```
<类型>: <主题>

<正文>

<页脚>
```

类型包括：

- **feat**: 新功能
- **fix**: 缺陷修复
- **docs**: 文档变更
- **style**: 代码风格变更
- **refactor**: 重构
- **test**: 添加或修改测试
- **chore**: 构建或依赖变更

示例：

```
feat: 添加短信通知功能

实现订单确认时发送短信通知功能。
集成阿里云短信服务。

Closes #123
```

### 开发流程

1. **创建特性分支**

```bash
git checkout -b feature/user-notification
```

2. **进行开发和测试**

```bash
# 进行代码编写
# 运行测试确保代码质量
mvn test
```

3. **提交更改**

```bash
git add .
git commit -m "feat: 添加用户通知功能"
```

4. **推送到 Fork**

```bash
git push origin feature/user-notification
```

5. **创建 Pull Request**
   - 在 GitHub 上创建 Pull Request
   - 填写 PR 描述（参考下面的模板）
   - 等待审核

### Pull Request 模板

```markdown
## 描述

简明扼要地描述你的改动。

## 相关 Issue

关闭 #123

## 改动类型

- [ ] Bug 修复
- [ ] 新功能
- [ ] 破坏性变更
- [ ] 文档更新

## 测试

请描述你进行的测试：

- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 手动测试通过

## 检查清单

- [ ] 代码符合项目风格规范
- [ ] 已进行自测
- [ ] 已添加或更新相关文档
- [ ] 提交消息清晰明确
- [ ] 无多余的打印语句或注释
```

## 代码审核

### 审核者职责

- 检查代码质量
- 验证功能实现
- 提供建设性反馈
- 检查是否符合规范

### 被审核者职责

- 及时响应评论
- 解释代码设计决策
- 根据反馈进行改进
- 保持讨论友好

## 文档贡献

### 文档改进

- 修复拼写或语法错误
- 改进示例代码
- 更新过时的信息
- 添加缺失的部分

### 创建新文档

如需添加新的文档：

1. 在根目录创建 Markdown 文件
2. 遵循已有文档的格式
3. 添加到 README.md 的导航中
4. 提交 Pull Request

## 项目结构

```
HotelSSM/
├── src/                    # Java 源代码
├── WebContent/             # Web 资源
├── db_hotel_ssm.sql        # 数据库脚本
├── README.md               # 项目说明
├── DATABASE_SETUP.md       # 数据库设置
├── DEPLOYMENT.md           # 部署指南
├── CONTRIBUTING.md         # 本文件
└── LICENSE                 # 许可证
```

## 常见问题

### Q1: 如何本地测试我的改动？

1. 导入项目到 IDE
2. 配置 Tomcat 服务器
3. 运行项目
4. 进行手动测试

### Q2: 如何运行测试？

```bash
# 运行所有测试
mvn test

# 运行特定测试
mvn test -Dtest=UserServiceTest
```

### Q3: 如何处理合并冲突？

```bash
# 获取最新代码
git fetch origin
git rebase origin/main

# 解决冲突后
git add .
git rebase --continue
```

## 许可证

通过贡献，你同意将你的代码在 MIT 许可证下发布。

## 沟通渠道

- **Issue**: 报告 bug 和功能建议
- **Discussion**: 讨论设计和架构
- **Pull Request**: 代码审核

## 致谢

感谢所有贡献者的支持！

---

**最后更新**：2026 年 3 月
