# Hotel SSM 酒店管理系统

这是一个基于 SSM (Spring + SpringMVC + MyBatis) 框架开发的酒店管理系统，提供酒店日常运营管理的全套解决方案。

## 功能特性

- **账户管理**：用户账户和权限管理
- **订单管理**：酒店订单预订、管理和追踪
- **房间管理**：房间信息、房型管理和房间状态控制
- **入住管理**：客人入住登记和退房管理
- **楼层管理**：酒店楼层和房间分布管理
- **统计分析**：营业数据统计和报表展示
- **菜单角色管理**：细粒度的权限控制系统
- **日志管理**：系统操作日志记录
- **后台管理系统**：基于 EasyUI 和 H-UI 的管理界面
- **前台预订系统**：用户自助预订界面

## 技术栈

| 技术      | 版本         |
| --------- | ------------ |
| Java      | 8+           |
| Spring    | 4.2.x        |
| SpringMVC | 4.2.x        |
| MyBatis   | 3.x          |
| MySQL     | 5.7+ 或 8.0+ |
| Tomcat    | 7.0+         |
| C3P0      | 连接池       |
| EasyUI    | 前端框架     |
| H-UI      | 前端框架     |
| jQuery    | 1.11.3       |
| Log4j     | 日志框架     |

## 项目结构

```
HotelSSM/
├── src/                          # Java 源代码
│   ├── com/ischoolbar/programmer/
│   │   ├── controller/           # 控制器层
│   │   │   ├── admin/            # 后台管理控制器
│   │   │   └── home/             # 前台预订控制器
│   │   ├── service/              # 业务逻辑层
│   │   ├── dao/                  # 数据访问层
│   │   ├── entity/               # 实体类
│   │   ├── page/                 # 分页类
│   │   ├── util/                 # 工具类
│   │   └── interceptor/          # 拦截器
│   └── config/                   # 配置文件
│       ├── db.properties         # 数据库配置
│       ├── log4j.properties      # 日志配置
│       ├── spring/               # Spring 配置
│       ├── springmvc/            # SpringMVC 配置
│       └── mybatis/              # MyBatis 配置及 Mapper
├── WebContent/                   # Web 资源目录
│   ├── resources/                # 静态资源
│   │   ├── admin/                # 后台管理资源
│   │   ├── home/                 # 前台预订资源
│   │   └── upload/               # 上传文件目录
│   └── WEB-INF/
│       ├── web.xml               # Web 配置文件
│       └── views/                # JSP 视图文件
├── db_hotel_ssm.sql              # 数据库 SQL 脚本
└── README.md                     # 本说明文档
```

## 快速开始

### 前置条件

- JDK 8 或更高版本
- MySQL 5.7 或更高版本
- Tomcat 7.0 或更高版本
- IDE（Eclipse 或 IntelliJ IDEA）

### 安装步骤

#### 1. 克隆项目

```bash
git clone https://github.com/yourusername/HotelSSM.git
cd HotelSSM
```

#### 2. 创建数据库

```bash
# 登录 MySQL
mysql -u root -p

# 执行 SQL 脚本创建数据库和表
source db_hotel_ssm.sql;
```

或在 MySQL GUI 工具中直接执行 `db_hotel_ssm.sql` 文件。

#### 3. 配置数据库连接

编辑 `src/config/db.properties` 文件，根据你的 MySQL 环境修改配置：

```properties
datasource.connection.url=jdbc:mysql://localhost:3306/db_hotel_ssm?useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT%2B8
datasource.connection.username=root
datasource.connection.password=你的MySQL密码
```

#### 4. 部署到 Tomcat

1. 在 IDE 中配置 Tomcat 服务器
2. 将项目部署到 Tomcat
3. 启动 Tomcat 服务器

#### 5. 访问系统

- **后台管理系统**：http://localhost:8080/HotelSSM/system/login
- **前台预订系统**：http://localhost:8080/HotelSSM/home/index

### 默认账户

系统预置测试账户（详见 `db_hotel_ssm.sql`），建议首次登录后修改密码。

## 主要模块说明

### 1. 账户管理模块

- 用户注册和登录
- 用户资料管理
- 密码修改

### 2. 订单管理模块

- 预订订单创建和查看
- 订单状态管理
- 订单查询和统计

### 3. 房间管理模块

- 房间信息维护
- 房型分类管理
- 房间状态管理（可用、预订、入住等）

### 4. 入住管理模块

- 客人入住登记
- 退房处理
- 入住记录查询

### 5. 权限管理模块

- 角色管理
- 菜单权限配置
- 用户角色分配

## 配置文件说明

### db.properties - 数据库配置

配置数据库连接参数、连接池大小等

### log4j.properties - 日志配置

配置日志级别、输出方式等

### applicationContext.xml - Spring 配置

配置数据源、事务管理、DAO 扫描等

### springmvc.xml - SpringMVC 配置

配置视图解析器、拦截器、静态资源处理等

### mybatis-config.xml - MyBatis 配置

配置 MyBatis 全局设置、类型别名等

## 常见问题

### Q1: 如何更改数据库编码？

在 MySQL 中执行以下命令：

```sql
ALTER DATABASE db_hotel_ssm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Q2: 如何处理 MySQL 8 小时无连接断开问题？

在 `db.properties` 中配置 `idleConnectionTestPeriod=0` 即可。

### Q3: 如何添加新的菜单和权限？

在数据库的 `menu` 和 `authority` 表中添加相应记录。

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

本项目采用 MIT 许可证。详见 LICENSE 文件。

## 联系方式

如有问题或建议，欢迎联系开发者。

---

**最后更新**：2026 年 3 月
