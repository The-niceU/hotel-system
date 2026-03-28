# 部署指南

本文档说明如何将 Hotel SSM 项目部署到生产环境。

## 部署前检查清单

- [ ] 已配置 MySQL 数据库
- [ ] 已导入 `db_hotel_ssm.sql` 数据库脚本
- [ ] 已修改 `db.properties` 中的数据库密码
- [ ] 已清理 `build/` 和 `classes/` 目录
- [ ] 已删除所有 IDE 特定配置文件
- [ ] 已验证代码中没有硬编码的敏感信息

## 部署环境要求

### 服务器要求

| 项目     | 最低配置                  | 推荐配置                  |
| -------- | ------------------------- | ------------------------- |
| CPU      | 2 核                      | 4 核+                     |
| 内存     | 2 GB                      | 4 GB+                     |
| 存储     | 20 GB                     | 50 GB+                    |
| 操作系统 | CentOS 7+ / Ubuntu 16.04+ | CentOS 8+ / Ubuntu 20.04+ |

### 软件要求

| 软件     | 版本 | 说明                 |
| -------- | ---- | -------------------- |
| Java JDK | 8+   | 推荐 JDK 8 或 JDK 11 |
| MySQL    | 5.7+ | 推荐 MySQL 8.0       |
| Tomcat   | 8.5+ | 推荐 Tomcat 9.0+     |

## 部署步骤

### 1. 服务器环境准备

#### 1.1 安装 Java

```bash
# CentOS/RHEL
sudo yum install java-1.8.0-openjdk java-1.8.0-openjdk-devel

# Ubuntu/Debian
sudo apt-get install openjdk-8-jdk

# 验证安装
java -version
```

#### 1.2 安装 MySQL

```bash
# CentOS/RHEL
sudo yum install mysql-server

# Ubuntu/Debian
sudo apt-get install mysql-server

# 启动 MySQL
sudo systemctl start mysqld
sudo systemctl enable mysqld
```

#### 1.3 安装 Tomcat

```bash
# 下载 Tomcat 9
wget https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.65/bin/apache-tomcat-9.0.65.tar.gz

# 解压
tar -xzf apache-tomcat-9.0.65.tar.gz
sudo mv apache-tomcat-9.0.65 /opt/tomcat

# 设置权限
sudo chown -R tomcat:tomcat /opt/tomcat
```

### 2. 数据库部署

```bash
# 登录 MySQL
mysql -u root -p

# 执行 SQL 脚本
source /path/to/db_hotel_ssm.sql;

# 创建数据库用户（推荐）
CREATE USER 'hotel'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON db_hotel_ssm.* TO 'hotel'@'localhost';
FLUSH PRIVILEGES;
```

### 3. 应用部署

#### 3.1 打包应用

使用 IDE 或 Maven 构建 WAR 包：

```bash
# 如果使用 Maven
mvn clean package -DskipTests

# 或在 IDE 中：右键项目 → Export → WAR file
```

#### 3.2 部署 WAR

```bash
# 复制 WAR 包到 Tomcat
cp HotelSSM.war /opt/tomcat/webapps/

# Tomcat 会自动解压部署
```

#### 3.3 配置 Tomcat

编辑 `/opt/tomcat/conf/server.xml`：

```xml
<Engine name="Catalina" defaultHost="localhost">
    <Host name="localhost" appBase="webapps"
          unpackWARs="true" autoDeploy="true">

        <Context path="/HotelSSM" docBase="HotelSSM" reloadable="false"/>

    </Host>
</Engine>
```

### 4. 应用配置

#### 4.1 配置数据库连接

编辑 `WEB-INF/classes/config/db.properties`：

```properties
datasource.connection.url=jdbc:mysql://localhost:3306/db_hotel_ssm?useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT%2B8
datasource.connection.username=hotel
datasource.connection.password=strong_password
datasource.connection.maxPoolSize=20
```

#### 4.2 配置日志

编辑 `WEB-INF/classes/config/log4j.properties`：

```properties
log4j.rootLogger=INFO, FILE

log4j.appender.FILE=org.apache.log4j.RollingFileAppender
log4j.appender.FILE.File=/var/log/tomcat/HotelSSM.log
log4j.appender.FILE.MaxFileSize=10MB
log4j.appender.FILE.MaxBackupIndex=10
```

### 5. 启动应用

```bash
# 启动 Tomcat
sudo /opt/tomcat/bin/startup.sh

# 查看日志
tail -f /opt/tomcat/logs/catalina.out

# 访问应用
http://your_server_ip:8080/HotelSSM
```

## Nginx 反向代理配置

如需在 Nginx 后面部署 Tomcat：

```nginx
upstream tomcat {
    server localhost:8080;
}

server {
    listen 80;
    server_name your_domain.com;

    location /HotelSSM {
        proxy_pass http://tomcat/HotelSSM;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## SSL/HTTPS 配置

### 生成自签名证书（测试用）

```bash
keytool -genkey -alias tomcat -keyalg RSA -keystore /opt/tomcat/conf/keystore -validity 365
```

### 在 Tomcat 中启用 HTTPS

编辑 `/opt/tomcat/conf/server.xml`：

```xml
<Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
           maxThreads="150" SSLEnabled="true">
    <SSLHostConfig>
        <Certificate certificateKeyFile="/opt/tomcat/conf/keystore"
                     certificatePassword="password"
                     type="RSA" />
    </SSLHostConfig>
</Connector>
```

## 监控和维护

### 日志管理

```bash
# 查看应用日志
tail -f /var/log/tomcat/HotelSSM.log

# 归档日志
gzip /var/log/tomcat/HotelSSM.log.*
```

### 性能监控

```bash
# 监控 Java 进程
jps -l
jstat -gc <pid>

# 监控系统资源
top
free -h
df -h
```

### 数据库备份

```bash
# 每日备份（建议加入 crontab）
mysqldump -u root -p db_hotel_ssm > /backup/db_hotel_ssm_$(date +%Y%m%d).sql

# Crontab 定时备份
0 2 * * * mysqldump -u root -ppassword db_hotel_ssm > /backup/db_hotel_ssm_$(date +\%Y\%m\%d).sql
```

## 故障排除

### 应用启动失败

1. 查看 Tomcat 日志：`/opt/tomcat/logs/catalina.out`
2. 检查数据库连接
3. 检查端口占用：`netstat -tuln | grep 8080`
4. 检查文件权限

### 数据库连接错误

```bash
# 检查 MySQL 服务
systemctl status mysqld

# 测试连接
mysql -h localhost -u hotel -p
```

### 内存溢出

编辑 `/opt/tomcat/bin/catalina.sh`，增加堆内存：

```bash
export JAVA_OPTS="-Xms512m -Xmx2048m"
```

## 安全建议

- ✅ 修改所有默认密码
- ✅ 启用防火墙，只开放必要端口
- ✅ 定期更新操作系统和应用
- ✅ 配置 SSL/HTTPS
- ✅ 定期备份数据库
- ✅ 配置日志审计
- ✅ 限制数据库账户权限
- ✅ 使用强密码
- ✅ 定期安全扫描

## 性能优化

- 配置适当的 Tomcat 线程数
- 使用连接池和缓存
- 定期清理日志文件
- 数据库查询优化
- 启用 Gzip 压缩

## 备份恢复

```bash
# 备份整个应用目录
tar -czf HotelSSM_backup_$(date +%Y%m%d).tar.gz /opt/tomcat/webapps/HotelSSM

# 恢复备份
tar -xzf HotelSSM_backup_20260329.tar.gz -C /opt/tomcat/webapps/
```

---

**最后更新**：2026 年 3 月
