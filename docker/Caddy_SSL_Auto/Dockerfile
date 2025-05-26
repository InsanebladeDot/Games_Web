# 使用官方的OpenJDK 17镜像作为基础镜像
FROM openjdk:17-jdk-alpine

# 设置工作目录
WORKDIR /app

# 将Spring Boot应用的jar文件复制到容器中
COPY backstage/SpringBootText-0.0.1-SNAPSHOT.jar /app/SpringBootText-0.0.1-SNAPSHOT.jar
# 如果需要，可以在这里添加任何环境变量或额外的配置步骤

# 启动Spring Boot应用
ENTRYPOINT ["java", "-jar", "/app/SpringBootText-0.0.1-SNAPSHOT.jar"]