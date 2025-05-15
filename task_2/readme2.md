## In this task, you will use NGINX Plus to create a load balancer for your web applications

#### Make sure you are root user
`su -`

#### Copy `lb.conf` file to that folder
`cp /home/ubuntu/nginx-apigw-2025/task_2/lb.conf /etc/nginx/conf.d`

`nginx -t`

`nginx -s reload`

#### Test the load balancer from command line
`curl -I http://web.f5demos.com:9000`

#### Alternatively, from Jump Host component, open Firefox and type this in the address bar
`http://web.f5demos.com:9000`

#### Next, we will create a dashboard to monitor upstream servers
`cp /home/ubuntu/nginx-apigw-2025/task_2/dashboard.conf /etc/nginx/conf.d`

`nginx -t`

`nginx -s reload`

#### Go to Firefox, open a new tab and access the dashboard
`http://web.f5demos.com:8084/dashboard.html`

#### Now we will enable App Protect for NGINX, we will overwrite the original `/etc/nginx/nginx.conf` file
Back up the file first as a good practice

`mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup`

Copy the new file with App Protect loaded

`cp /home/ubuntu/nginx-apigw-2025/task_2/nginx.conf /etc/nginx`

#### Open `/etc/nginx/conf.d/lb.conf` and uncomment these lines (removing #) to enable App Protect
```
app_protect_enable on;
app_protect_policy_file /etc/app_protect/conf/NginxDefaultPolicy.json;
app_protect_security_log_enable on;
app_protect_security_log /opt/app_protect/share/defaults/log_illegal.json /var/log/app_protect/security.log;
```
#### Test App Protect
Normal traffic will be fine

`curl http://web.f5demos.com:9000`

Script attack will be blocked

`curl 'http://web.f5demos.com:9000/?<script>alert(1)</script>'`

#### View security log
View the first record

```
grep 'json_log=' /var/log/app_protect/security.log \
| head -n1 \
| perl -nE 'if (/json_log="((?:(?!"\,\w+=).)*)"/) { $json=$1; $json =~ s/""/"/g; say $json }' \
| jq
```

View the last record

```
grep 'json_log=' /var/log/app_protect/security.log \
| tail -n1 \
| perl -nE 'if (/json_log="((?:(?!"\,\w+=).)*)"/) { $json=$1; $json =~ s/""/"/g; say $json }' \
| jq
```

View by Support ID

```
grep 'json_log=' /var/log/app_protect/security.log \
| perl -nE 'if (/json_log="((?:(?!"\,\w+=).)*)"/) { $json=$1; $json =~ s/""/"/g; say $json }' \
| jq 'select(.id == "<Support-ID-goes-here>")'
```
