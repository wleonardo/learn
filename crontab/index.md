linux 定时任务

> crond常常在后台运行，每一分钟检查是否有预定的作业需要执行

* `crontab -l`  查看当前运行的任务
* `crontab -e`  编辑任务
* `cat /etc/crontab` crontab的一些基础配置，路径，执行用户等等，也可以查看配置说明

 Example of job definition:
 .---------------- minute (0 - 59)
 |  .------------- hour (0 - 23)
 |  |  .---------- day of month (1 - 31)
 |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
 |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
 |  |  |  |  |
 \*  *  *  *  * user-name  command to be executed

例子
```
// 每分钟使用node 执行一次/var/app/index.js
* * * * * node /var/app/index.js

// 每10分钟使用node 执行一次/var/app/index.js
*/10 * * * * node /var/app/index.js

// 每小时的0分使用node 执行一次/var/app/index.js
0 * * * * node /var/app/index.js

// 每隔10小时的10分使用node 执行一次/var/app/index.js
10 */10 * * * node /var/app/index.js

// 每天的10点的10分使用node 执行一次/var/app/index.js
10 10 * * * node /var/app/index.js
```
