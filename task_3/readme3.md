## In this task, you will configure NGINX Plus as an API Gateway

#### Copy necessary files into nginx setup
`sudo su -`

`cp /home/ubuntu/nginx-apigw-2025/task_3/apikey.keyval /etc/nginx`

`cp /home/ubuntu/nginx-apigw-2025/task_3/csv_to_json.js /etc/nginx`

`cp /home/ubuntu/nginx-apigw-2025/task_3/apigwdemo.com.crt /etc/nginx`

`cp /home/ubuntu/nginx-apigw-2025/task_3/apigwdemo.com.key /etc/nginx`

`cp /home/ubuntu/nginx-apigw-2025/task_3/apisecret.jwk /etc/nginx/conf.d`

`cp /home/ubuntu/nginx-apigw-2025/task_3/apigw.conf /etc/nginx/conf.d`

---

## Test Guide

This guide contains `curl` commands to test every API gateway feature configured in your NGINX Plus setup.

The API gateway is running at:  
**https://apigw.f5demos.com:8443**

```bash
# ----------------------------
# 1. Basic Proxy Routes
# ----------------------------

# Get list of F1 drivers
curl -k https://apigw.f5demos.com:8443/api/f1/drivers | jq

# Get list of F1 seasons
curl -k https://apigw.f5demos.com:8443/api/f1/seasons | jq

# Get list of F1 circuits
curl -k https://apigw.f5demos.com:8443/api/f1/circuits | jq


# ----------------------------
# 2. Load Balancing & Rate Limit Demo
# ----------------------------

# Try normal access
curl -k https://apigw.f5demos.com:8443/get | jq

# Repeat this quickly (2+ per second) to trigger rate limit (429)
curl -k https://apigw.f5demos.com:8443/get | jq
curl -k https://apigw.f5demos.com:8443/get | jq


# ----------------------------
# 3. Regex URI Rewrite
# ----------------------------

# Matches /delay/1 and rewrites internally to /drivers
curl -k https://apigw.f5demos.com:8443/delay/1


# ----------------------------
# 4. API Key Authentication (Static Map)
# ----------------------------

# Valid API key (client_one)
curl -k https://apigw.f5demos.com:8443/post \
  -H "X-API-Key: P5FcvLwkyN7eethF" | jq

# Invalid key → should return 403
curl -k https://apigw.f5demos.com:8443/post \
  -H "X-API-Key: wrongkey" | jq

# Missing key → should return 401
curl -k https://apigw.f5demos.com:8443/post | jq


# ----------------------------
# 5. JWT Authentication (Claim-based)
# ----------------------------

# Replace <your_token> with a JWT containing claim "uid": 222
curl -k https://apigw.f5demos.com:8443/drivers \
  -H "Authorization: Bearer <your_token>"

# Any other uid or invalid token will return 403


# ----------------------------
# 6. Keyval-based API Key Authentication
# ----------------------------

# Valid key with value 1 in keyval store
curl -k https://apigw.f5demos.com:8443/anything \
  -H "X-KV-Api-Key: 2j1PM5rwgt1" | jq

# Invalid or missing key → 403 Forbidden
curl -k https://apigw.f5demos.com:8443/anything \
  -H "X-KV-Api-Key: wrongkey" | jq


# ----------------------------
# 7. Convert CSV to JSON (via NJS)
# ----------------------------

# Valid input: Converts | delimited CSV into JSON
curl -k https://apigw.f5demos.com:8443/convert-csv \
  -X POST -H "Content-Type: text/plain" \
  --data 'PAT|SG12345|John Tan|1980-12-01|M|A+' | jq

# Invalid input: Fewer fields, triggers error response
curl -k https://apigw.f5demos.com:8443/convert-csv \
  -X POST -H "Content-Type: text/plain" \
  --data 'PAT|Too|Short' | jq
