# NGINX Plus as API Gateway Demo

## 🔰 Introduction to NGINX

NGINX is a high-performance web server, reverse proxy, and load balancer. While it originally served static content and handled HTTP traffic efficiently, it has evolved into a powerful platform for API management, edge compute, and security.

With **NGINX Plus**, the commercial version of NGINX, advanced features like health checks, session persistence, key-value store, built-in monitoring, and enhanced security modules become available—making it an ideal solution for modern API Gateway use cases.

---

## 🚀 About This Repository

This repository provides a complete **NGINX Plus API Gateway demo** that showcases advanced traffic management and security features.

### Key Capabilities Demonstrated:

* **SSL termination**
* **Load balancing** with sticky session (cookie-based)
* **Rate limiting** to control request floods per client IP
* **JWT authentication** to validate client identity and access scope
* **Static and dynamic API key authentication** using `map` and `keyval`
* **Custom error handling** with JSON responses
* **NJS scripting** to convert healthcare data from CSV to JSON on-the-fly
* **Regex-based rewrites** for flexible routing

---

## 🔐 JWT Authentication Explained

JWT (JSON Web Token) is an open standard used for securely transmitting information between parties as a JSON object. It's commonly used for authentication and authorization.

### Components of a JWT:

A JWT consists of **three parts**, separated by dots:

```
<Header>.<Payload>.<Signature>
```

#### 1. **Header**

Specifies the algorithm and token type:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### 2. **Payload**

Contains claims — typically user info and permissions:

```json
{
  "uid": 222,
  "name": "demo",
  "exp": 1893456000
}
```

#### 3. **Signature**

Signed using a secret key (shared or private key) to ensure integrity.

> In this project, NGINX Plus uses `auth_jwt` to verify JWTs and allows routing based on claims (e.g., `uid = 222`).

---

## 📂 Files Included

* `apigw.conf` — main API Gateway config with SSL, JWT, rate limiting, key auth, and NJS
* `dashboard.conf` — exposes the NGINX Plus API and dashboard UI on port `8084`
* `web.conf` — backend mock apps running on ports `9001`, `9002`, and `9003`
* `apisecret.jwk` — shared symmetric key for validating JWT tokens
* `apikey.keyval` — sample key-value store for dynamic API key authentication
* `csv_to_json.js` — NJS script for converting healthcare CSV to JSON

---

## 📌 Requirements

* NGINX Plus
* App Protect module (optional for WAF features)
* Valid TLS certs (e.g., `apigwdemo.com.crt`)

---

## 📘 References

* [NGINX Plus Documentation](https://docs.nginx.com/nginx/)
* [NGINX App Protect WAF](https://docs.nginx.com/nginx-app-protect/)
* [JSON Web Token Introduction](https://jwt.io/introduction/)


