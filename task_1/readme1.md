## In this task, you will use NGINX Plus to serve web content
In F5 UDF environment, go to Components > NGINX Plus > Access > Web Shell

#### Make sure you are root user
`su -`

#### Copy `web.conf` file to nginx configuration directory
`cp /home/ubuntu/nginx-apigw-2025/task_1/web.conf /etc/nginx/conf.d`

`nginx -t && nginx -s reload`

#### Test the web hosting from command line
`curl -I http://web.f5demos.com:9001`

`curl -I http://web.f5demos.com:9002`

`curl -I http://web.f5demos.com:9003`

#### Alternatively, from Jump Host component, open Firefox browser and type this in the address bar
`http://web.f5demos.com:9001`

`http://web.f5demos.com:9002`

`http://web.f5demos.com:9003`
