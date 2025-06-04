---
title: "记发布开源组件到Maven Central仓库"
sidebar:
    - text: "简介"
      items:
        - text: "什么是DocuPress？"
          link: "/what"
        - text: "快速开始"
          link: "/started"
        - text: "记发布开源组件到Maven Central仓库"
          link: "/publish-maven-central-repo"
    - text: "写作"
      items:
        - text: "Markdown扩展"
          link: "/markdown"
    - text: "Api参考"
    - text: "Api参考"
---

## 一、注册登录

打开网址：[Maven Central](https://central.sonatype.com/)

点击右上角Sign in

![Sign in](https://api.admin.chenjiabao.com/public/1/20250321/202503211529235.png)

注册并登录账号，需要邮箱魔链认证

![邮箱认证](https://api.admin.chenjiabao.com/public/1/20250321/202503211530337.png)

## 二、创建命名空间

点击左上角Publish

![Publish](https://api.admin.chenjiabao.com/public/1/20250321/202503211535148.png)

点击Namespace，再点击Add Namespace

![Add Namespace](https://api.admin.chenjiabao.com/public/1/20250321/202503211537129.png)

输入命名空间，命名空间一般为域名倒写，也即是项目的groupId

![输入命名空间](https://api.admin.chenjiabao.com/public/1/20250321/202503211539184.png)

点击提交后会给我们一段文本

![提交文本](https://api.admin.chenjiabao.com/public/1/20250321/202503211541330.png)

在域名解析记录中添加一条TXT记录，其记录值即为刚提供的字符串

![TXT记录](https://api.admin.chenjiabao.com/public/1/20250321/202503211543055.png)

点击验证命名空间，等待解析生效

![验证命名空间](https://api.admin.chenjiabao.com/public/1/20250321/202503211544336.png)

验证成功如下

![验证成功](https://api.admin.chenjiabao.com/public/1/20250321/202503211545450.png)

## 三、生成Token

点击View Account

![View Account](https://api.admin.chenjiabao.com/public/1/20250321/202503211531454.png)

点击Generate User Token生成Token

![Generate Token](https://api.admin.chenjiabao.com/public/1/20250321/202503211547492.png)

点击ok后会生成类似如下的文本，记得及时复制，找个地方保存一下，后续会用到。

```xml
<server>
    <id>${server}</id>
    <username>1vjkjkhsdfgiuyh</username>
    <password>YjdwaVKsNIawdwaasdasifEr3R+wZDzHhhrthrtBjSgCt</password>
</server>
```

## 四、配置GPG

打开网站：[GnuPG](https://gnupg.org/download/index.html#sec-1-2)

下载对应版本，Windows下载Gpg4win就行，下载后无脑下一步安装即可，但需要记住安装路径，可以更改安装路径。

![下载](https://api.admin.chenjiabao.com/public/1/20250321/202503211555008.png)

使用gpg --version检查是否安装成功

![检查](https://api.admin.chenjiabao.com/public/1/20250321/202503211557587.png)

之后需要输入真实姓名和邮箱(最好真实有效的，后续需要接收邮件)，然后输入大写字母O确认

![输入邮箱](https://api.admin.chenjiabao.com/public/1/20250321/202503211604101.png)

之后会弹出如下窗口，设置密码，两个输入框输入相同的密码，这个密码一定要记住，后续会用到

![设置密码](https://api.admin.chenjiabao.com/public/1/20250321/202503211605276.png)

下图即是生成的公钥，请复制记下来

![公钥](https://api.admin.chenjiabao.com/public/1/20250321/202503211608464.png)

使用如下命令将公钥发送到GPG公钥服务器

```shell
gpg --keyserver <服务器地址> --send-keys <公钥>
```

其中公钥即刚才生成的，服务器地址存在如下几个，不成功就都试一下，我是使keys.openpgp.org成功的。

```html
keys.openpgp.org
keyserver.ubuntu.com
pgp.mit.edu
```

![发送秘钥](https://api.admin.chenjiabao.com/public/1/20250321/202503211621596.png)

上传成功后会收到如下一封邮件，点击邮件中的魔链验证一下就成功了

![收到魔链](https://api.admin.chenjiabao.com/public/1/20250321/202503211622281.png)

点击Send Verification Email发送验证邮箱

![发送验证邮箱](https://api.admin.chenjiabao.com/public/1/20250321/202503211623416.png)

之后会收到一封验证邮件

![验证邮件](https://api.admin.chenjiabao.com/public/1/20250321/202503211625232.png)

点击验证后，即公钥上传成功

![验证成功](https://api.admin.chenjiabao.com/public/1/20250321/202503211626018.png)

## 五、配置settings.xml

配置Maven中conf下的settings.xml

找到`<servers>`标签，在下面添加刚才生成token时，复制的文本

注意id标签内的文本需要替换一下，我这里替换成了ossrh，其实你也可以自定义，但后续pom.xml配置中需要跟这里对应，username和password不要改动。

```xml
<server>
    <id>ossrh</id>
    <username>1vjkjkhsdfgiuyh</username>
    <password>YjdwaVKsNIawdwaasdasifEr3R+wZDzHhhrthrtBjSgCt</password>
</server>
```

继续寻找`<profiles>`标签，在下面添加如下文本：

```xml
<profile>
    <id>gpg</id>
    <properties>
        <!--这里为gpg安装目录下的bin目录-->
        <gpg.executable>E:\GnuPG\bin</gpg.executable>
        <!--这里为刚才生成GPG时，弹窗设置的密码-->
        <gpg.passphrase>123456</gpg.passphrase>
    </properties>
</profile>
```

继续滚动到最底部，找到`</settings>`标签，在其上添加如下文本：

```xml
<activeProfiles>
    <activeProfile>gpg</activeProfile>
</activeProfiles>
```

记得保存后退出

## 六、创建项目

使用IDEA生成java项目,选择maven进行依赖管理，注意groupId应该和之前命名空间一样。

## 七、github仓库

将项目上传至github仓库，得到仓库url地址和git地址，因为后面不配置这些会上传失败。gitee应该也是可以的，我没有试验过。

## 八、配置pom.xml文件

标签内中文部分替换一下就行，其他的都不要动，当然，若你看该文章时，相关插件有了新的版本，可将版本号替换一下。有其他的依赖包啥的，添加即可，但下面是基础的配置，不可少。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <name>这里是项目名称，随便取</name>
    <description>这是项目描述，名称和描述都是必须的</description>
    <url>github仓库地址</url>
    <groupId>这里是之前添加的命名空间</groupId>
    <artifactId>devtools</artifactId>
    <version>注意这里版本最小为0.1.0，之后每次上传都需要比前一次大</version>
    <packaging>jar</packaging>

    <scm>
        <url>仓库url地址</url>
        <connection>scm:git:git地址</connection>
        <developerConnection>scm:git:git地址</developerConnection>
        <tag>v${project.version}</tag>
    </scm>

    <licenses>
        <license>
            <name>Apache License, Version 2.0</name>
            <url>https://www.apache.org/licenses/LICENSE-2.0.txt</url>
        </license>
    </licenses>

    <developers>
        <developer>
            <name>姓名，与生成GPG时一样</name>
            <email>邮箱，与生成GPG时一样</email>
        </developer>
    </developers>

    <distributionManagement>
        <repository>
            <id>ossrh</id>
            <url>https://s01.oss.sonatype.org/service/local/staging/deploy/maven2/</url>
        </repository>
        <snapshotRepository>
            <id>ossrh</id>
            <url>https://s01.oss.sonatype.org/content/repositories/snapshots/</url>
        </snapshotRepository>
    </distributionManagement>

    <build>
        <plugins>
            <!-- Compiler -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.13.0</version>
                <configuration>
                    <source>${maven.compiler.source}</source>
                    <target>${maven.compiler.target}</target>
                    <encoding>${project.build.sourceEncoding}</encoding>
                </configuration>
            </plugin>
            <!-- Source -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-source-plugin</artifactId>
                <version>3.3.1</version>
                <executions>
                    <execution>
                        <id>attach-sources</id>
                        <phase>verify</phase>
                        <goals>
                            <goal>jar-no-fork</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

            <!-- Javadoc -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-javadoc-plugin</artifactId>
                <version>3.10.0</version>
                <configuration>
                    <doclint>none</doclint>
                </configuration>
                <executions>
                    <execution>
                        <id>attach-javadocs</id>
                        <phase>verify</phase>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

            <!-- GPG -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-gpg-plugin</artifactId>
                <version>3.2.3</version>
                <configuration>
                    <executable>E:\\GnuPG\\bin\\gpg.exe</executable>
                    <gpgArguments>
                        <arg>--batch</arg>
                        <arg>--pinentry-mode</arg>
                        <arg>loopback</arg>
                    </gpgArguments>
                </configuration>
                <executions>
                    <execution>
                        <id>sign-artifacts</id>
                        <phase>verify</phase>
                        <goals>
                            <goal>sign</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

            <plugin>
                <groupId>org.sonatype.central</groupId>
                <artifactId>central-publishing-maven-plugin</artifactId>
                <version>0.4.0</version>
                <extensions>true</extensions>
                <configuration>
                    <publishingServerId>与刚才setting.xml中配置的一样，我刚配置的是ossrh，所以这里就填ossrh</publishingServerId>
                    <tokenAuth>true</tokenAuth>
                </configuration>
            </plugin>

        </plugins>
    </build>

</project>
```

## 九、发布

点击IDEA左侧deploy即可等待验证发布

![deploy](https://api.admin.chenjiabao.com/public/1/20250321/202503211656244.png)

执行无报错，即可点击Maven Central右上角的View Deployments

![View Deployments](https://api.admin.chenjiabao.com/public/1/20250321/202503211657473.png)

发布成功组件如下

![发布组件](https://api.admin.chenjiabao.com/public/1/20250321/202503211658432.png)

## 十、使用

根本其他依赖一样，在pom.xml引入依赖，然后再代码中调用即可

```xml
<dependency>
    <groupId>替换成刚才设置的groupId</groupId>
    <artifactId>替换成刚才设置的artifactId</artifactId>
    <version>0.1.0</version>
</dependency>
```

