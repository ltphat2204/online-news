# Báo điện tử Cripsy Chicken Rice

## Yêu cầu

- [Nodejs v16+](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Setup môi trường

Đầu tiên, ta cần cấu hình các thông số môi trường ở file .env

```env
    DB_URL=DB_URL
    GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET
    GITHUB_CLIENT_ID=GITHUB_CLIENT_ID
    GITHUB_CLIENT_SECRET=GITHUB_CLIENT_SECRET
    FACEBOOK_APP_ID=FACEBOOK_APP_ID
    FACEBOOK_APP_SECRET=FACEBOOK_APP_SECRET
    RECAPTCHA_SITE_KEY=RECAPTCHA_SITE_KEY
    RECAPTCHA_SECRET_KEY=RECAPTCHA_SECRET_KEY
    EMAIL=EMAIL
    EMAIL_APPPASS=EMAIL_APPPASS
```

Trong đó:

- DB_URL: nếu không thay đổi gì ở cấu hình database trong file `docker-compose.yml` thì đường dẫn mặc định sẽ là `DB_URL=postgres://postgres:root@localhost:5432/online-news`
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET: được lấy từ [Google Cloud Console Project](https://console.cloud.google.com/)
- GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET: được lấy từ [Github App](https://github.com/settings/applications/new)
- FACEBOOK_APP_ID, GITHUB_CLIENT_SECRET: được lấy từ [Facebook for developer](https://developers.facebook.com/apps)
- RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY: được lấy từ trang [reCaptcha](https://www.google.com/recaptcha/admin/create)
- EMAIL: email được dùng để gửi mã OTP
- EMAIL_APPPASS: mã ứng dụng của email nêu trên

## Chạy chương trình

Sau khi cấu hình các biến môi trường, ta sẽ chạy câu lệnh sau để app được host

``` bash
    docker compose up -d
```

Mặc định, app sẽ được host tại [http://localhost](http://localhost)