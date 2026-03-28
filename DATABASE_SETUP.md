# 数据库设置说明

## 数据库信息

- **数据库名**：`db_hotel_ssm`
- **字符集**：UTF-8
- **驱动**：MySQL 8.0 JDBC Driver (`com.mysql.cj.jdbc.Driver`)

## 数据库表结构

系统包含以下主要数据表：

### 1. account - 账户表

用户账户信息管理

| 字段     | 类型         | 说明     |
| -------- | ------------ | -------- |
| id       | int          | 主键     |
| name     | varchar(32)  | 用户名   |
| password | varchar(32)  | 密码     |
| realName | varchar(32)  | 真实姓名 |
| idCard   | varchar(32)  | 身份证号 |
| mobile   | varchar(16)  | 手机号   |
| address  | varchar(128) | 地址     |
| status   | int          | 账户状态 |

### 2. book_order - 订单表

酒店预订订单记录

| 字段         | 类型        | 说明            |
| ------------ | ----------- | --------------- |
| id           | int         | 主键            |
| accountId    | int         | 账户 ID（外键） |
| roomTypeId   | int         | 房型 ID（外键） |
| name         | varchar(32) | 预订人姓名      |
| idCard       | varchar(32) | 身份证号        |
| mobile       | varchar(16) | 手机号          |
| checkInDate  | date        | 入住日期        |
| checkOutDate | date        | 离店日期        |
| status       | int         | 订单状态        |

### 3. room_type - 房型表

房间类型信息（豪华房、标准房等）

| 字段         | 类型         | 说明     |
| ------------ | ------------ | -------- |
| id           | int          | 主键     |
| roomTypeName | varchar(32)  | 房型名称 |
| price        | decimal      | 房型价格 |
| description  | varchar(255) | 房型描述 |

### 4. room - 房间表

具体房间信息

| 字段       | 类型        | 说明            |
| ---------- | ----------- | --------------- |
| id         | int         | 主键            |
| roomNumber | varchar(16) | 房间号          |
| floorId    | int         | 楼层 ID（外键） |
| roomTypeId | int         | 房型 ID（外键） |
| status     | int         | 房间状态        |

### 5. floor - 楼层表

酒店楼层信息

| 字段        | 类型         | 说明     |
| ----------- | ------------ | -------- |
| id          | int          | 主键     |
| floorNumber | int          | 楼层号   |
| description | varchar(128) | 楼层描述 |

### 6. role - 角色表

系统用户角色

| 字段        | 类型         | 说明     |
| ----------- | ------------ | -------- |
| id          | int          | 主键     |
| roleName    | varchar(32)  | 角色名称 |
| description | varchar(128) | 角色描述 |

### 7. menu - 菜单表

系统菜单/功能点

| 字段        | 类型         | 说明     |
| ----------- | ------------ | -------- |
| id          | int          | 主键     |
| menuName    | varchar(32)  | 菜单名称 |
| menuUrl     | varchar(128) | 菜单 URL |
| description | varchar(128) | 菜单描述 |

### 8. authority - 权限表

角色与菜单的关联关系

| 字段   | 类型 | 说明            |
| ------ | ---- | --------------- |
| id     | int  | 主键            |
| roleId | int  | 角色 ID（外键） |
| menuId | int  | 菜单 ID（外键） |

## 安装步骤

### 方式一：使用命令行

```bash
# 进入 MySQL
mysql -u root -p

# 创建数据库（如果 SQL 文件中没有 DROP 语句）
CREATE DATABASE db_hotel_ssm CHARSET utf8;

# 导入 SQL 脚本
source /path/to/db_hotel_ssm.sql;

# 验证
USE db_hotel_ssm;
SHOW TABLES;
```

### 方式二：使用 GUI 工具（如 Navicat、SQLyog）

1. 新建查询窗口
2. 打开 `db_hotel_ssm.sql` 文件
3. 执行 SQL 脚本

## 数据库配置

编辑 `src/config/db.properties`：

```properties
# MySQL JDBC 配置
datasource.connection.driver_class=com.mysql.cj.jdbc.Driver
datasource.connection.url=jdbc:mysql://localhost:3306/db_hotel_ssm?useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT%2B8
datasource.connection.username=root
datasource.connection.password=你的MySQL密码

# C3P0 连接池配置
datasource.connection.initialPoolSize=3      # 初始连接数
datasource.connection.minPoolSize=3          # 最小连接数
datasource.connection.maxPoolSize=15         # 最大连接数
datasource.connection.acquireIncrement=3     # 增量连接数
datasource.connection.maxIdleTime=0          # 最大闲置时间（秒）
datasource.connection.idleConnectionTestPeriod=0  # 连接测试间隔
```

## 常见问题

### 1. 连接超时错误

**错误信息**：`Communications link failure`

**解决方案**：

- 检查 MySQL 服务是否启动
- 检查用户名和密码是否正确
- 检查 URL 中的数据库名是否存在
- 确保防火墙允许 3306 端口

### 2. 字符编码错误

**错误信息**：中文显示乱码

**解决方案**：

- 在 URL 中添加 `?useUnicode=true&characterEncoding=utf-8`
- 确保 MySQL 数据库字符集为 UTF-8

### 3. MySQL 8 小时自动断开连接

**错误信息**：`The last packet sent successfully to the server was 28800001 milliseconds ago`

**解决方案**：
在 `db.properties` 中配置：

```properties
datasource.connection.idleConnectionTestPeriod=0
```

### 4. 导入 SQL 文件失败

**可能原因**：

- SQL 文件编码不是 UTF-8
- SQL 语句中有语法错误
- 用户权限不足

**解决方案**：

- 使用 UTF-8 编码重新保存 SQL 文件
- 检查 SQL 文件内容
- 确保使用具有创建数据库权限的账户

## 数据备份

### 导出数据库

```bash
# 导出整个数据库
mysqldump -u root -p db_hotel_ssm > db_hotel_ssm_backup.sql

# 导出特定表
mysqldump -u root -p db_hotel_ssm account > account_backup.sql
```

### 导入备份

```bash
mysql -u root -p db_hotel_ssm < db_hotel_ssm_backup.sql
```

## 性能优化建议

1. **为常用查询字段添加索引**

```sql
ALTER TABLE book_order ADD INDEX idx_accountId (accountId);
ALTER TABLE book_order ADD INDEX idx_checkInDate (checkInDate);
ALTER TABLE room ADD INDEX idx_roomNumber (roomNumber);
```

2. **定期分析表**

```sql
ANALYZE TABLE account;
ANALYZE TABLE book_order;
```

3. **定期优化表**

```sql
OPTIMIZE TABLE account;
OPTIMIZE TABLE book_order;
```

## 重要提示

- ⚠️ 定期备份数据库
- ⚠️ 修改默认密码
- ⚠️ 限制数据库账户权限
- ⚠️ 生产环境中不要在代码中暴露数据库密码
