# 🏨 HotelSSM 酒店管理系统

<p align="center">
	<img alt="Java" src="https://img.shields.io/badge/Java-8%2B-blue?logo=openjdk">
	<img alt="Spring" src="https://img.shields.io/badge/Spring-4.2.x-6DB33F?logo=spring">
	<img alt="MyBatis" src="https://img.shields.io/badge/MyBatis-3.x-red">
	<img alt="MySQL" src="https://img.shields.io/badge/MySQL-5.7%2B%20%7C%208.0%2B-4479A1?logo=mysql&logoColor=white">
	<img alt="Tomcat" src="https://img.shields.io/badge/Tomcat-7%2B-F8DC75?logo=apachetomcat&logoColor=black">
	<img alt="License" src="https://img.shields.io/badge/License-MIT-green">
</p>

一个基于 **SSM（Spring + SpringMVC + MyBatis）** 的酒店管理系统，覆盖前台预订与后台运营管理场景，包含用户、房态、订单、入住、权限与统计等核心模块。

## ✨ 项目亮点

- **前后台完整业务闭环**：前台预订 + 后台管理。
- **标准三层架构**：Controller / Service / DAO 分层清晰，便于维护与扩展。
- **权限模型完整**：用户-角色-菜单-权限映射，支持细粒度授权。
- **数据驱动运营**：支持订单、入住、房间等维度统计展示。
- **传统 JSP 项目友好**：适合课程设计、毕设、Java Web 进阶实践。

## 🧩 功能模块

| 模块          | 说明                                   |
| ------------- | -------------------------------------- |
| 账户管理      | 注册登录、资料维护、密码修改、状态控制 |
| 房型/房间管理 | 房型维护、房间信息管理、房态维护       |
| 订单管理      | 预订下单、订单查询、状态流转           |
| 入住管理      | 入住登记、退房处理、入住记录           |
| 楼层管理      | 楼层基础信息与房间分布管理             |
| 权限管理      | 角色管理、菜单配置、权限分配           |
| 统计分析      | 业务数据统计、运营看板                 |
| 日志管理      | 系统日志记录与查询                     |

## 🛠️ 技术栈

| 分类   | 技术                                               |
| ------ | -------------------------------------------------- |
| 后端   | Java 8、Spring 4.2.x、SpringMVC 4.2.x、MyBatis 3.x |
| 数据库 | MySQL 5.7+ / 8.0+、C3P0 连接池                     |
| 前端   | JSP、jQuery 1.11.3、EasyUI、H-UI、ECharts          |
| 服务器 | Tomcat 7+                                          |
| 日志   | Log4j                                              |

## 🏗️ 系统架构

```text
Browser
	├─ 后台管理界面（EasyUI / H-UI）
	└─ 前台预订界面（JSP / jQuery）
					│
					▼
SpringMVC Controller
					│
					▼
Service 业务层
					│
					▼
MyBatis Mapper / DAO
					│
					▼
MySQL（db_hotel_ssm）
```

## 📁 项目结构

```text
HotelSSM/
├─ src/
│  ├─ com/ischoolbar/programmer/
│  │  ├─ controller/          # 控制层（admin/home）
│  │  ├─ service/             # 业务层
│  │  ├─ dao/                 # 持久层
│  │  ├─ entity/              # 实体层
│  │  ├─ interceptor/         # 拦截器
│  │  ├─ page/                # 分页对象
│  │  └─ util/                # 工具类
│  └─ config/
│     ├─ db.properties        # 数据源配置
│     ├─ log4j.properties     # 日志配置
│     ├─ spring/              # Spring 配置
│     ├─ springmvc/           # MVC 配置
│     └─ mybatis/             # MyBatis 配置与 Mapper XML
├─ WebContent/
│  ├─ resources/              # 静态资源（admin/home/upload）
│  └─ WEB-INF/
│     ├─ web.xml
│     └─ views/               # JSP 页面
├─ db_hotel_ssm.sql           # 数据库脚本
├─ DATABASE_SETUP.md          # 数据库说明
├─ DEPLOYMENT.md              # 部署说明
├─ CONTRIBUTING.md            # 贡献说明
└─ LICENSE
```

## 🚀 快速开始

### 1) 环境准备

- JDK 8+
- MySQL 5.7+ / 8.0+
- Tomcat 7+
- IntelliJ IDEA / Eclipse

### 2) 克隆项目

```bash
git clone https://github.com/The-niceU/hotel-system.git
cd hotel-system
```

### 3) 初始化数据库

```sql
-- 在 MySQL 客户端执行
source db_hotel_ssm.sql;
```

### 4) 配置数据库连接

编辑 `src/config/db.properties`：

```properties
datasource.connection.driver_class=com.mysql.cj.jdbc.Driver
datasource.connection.url=jdbc:mysql://localhost:3306/db_hotel_ssm?useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT%2B8
datasource.connection.username=root
datasource.connection.password=你的数据库密码
```

> 可先复制 `src/config/db.properties.example` 作为参考。

### 5) 启动并访问

将项目部署到 Tomcat 后访问：

- 后台管理：`http://localhost:8080/HotelSSM/system/login`
- 前台预订：`http://localhost:8080/HotelSSM/home/index`

## ⚙️ 关键配置说明

- `src/config/spring/applicationContext.xml`：Spring 容器与数据源配置
- `src/config/springmvc/springmvc.xml`：MVC 扫描、拦截器、视图解析
- `src/config/mybatis/mybatis-config.xml`：MyBatis 全局配置
- `WebContent/WEB-INF/web.xml`：Web 启动入口与过滤器配置

## 📚 文档导航

- 数据库配置与排障：[`DATABASE_SETUP.md`](./DATABASE_SETUP.md)
- 部署到服务器：[`DEPLOYMENT.md`](./DEPLOYMENT.md)
- 贡献规范：[`CONTRIBUTING.md`](./CONTRIBUTING.md)

## 🧪 常见问题

**Q1：MySQL 连接失败怎么办？**  
检查 `db.properties` 中 URL、用户名、密码和数据库名是否一致，并确认 MySQL 服务已启动。

**Q2：Tomcat 启动后 404？**  
确认部署上下文路径为 `HotelSSM`，且访问地址使用对应项目名。

**Q3：中文乱码？**  
确认数据库、连接串和页面编码均为 UTF-8。

## 🤝 贡献

欢迎提交 Issue / Pull Request 来完善项目。提交前请阅读 [`CONTRIBUTING.md`](./CONTRIBUTING.md)。

## 📄 License

本项目基于 [`MIT License`](./LICENSE) 开源。

---

如果你觉得这个项目对你有帮助，欢迎点一个 ⭐！
