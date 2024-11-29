# Báo điện tử Cripsy Chicken Rice

## Yêu cầu

- [Nodejs v20+](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Setup Database

### Tạo Postgres Docker Image

Có nhiều cách để setup được PostgreSql mà app đang sử dụng. Tuy nhiên, tiện lợi nhất là sử dụng Docker với các command như sau:

``` bash
    docker run --name local-postgres -e POSTGRES_PASSWORD=ltp2204 -e POSTGRES_DB=online-news -p 5432:5432 -d postgres:17-alpine
```

Với `POSTGRES_PASSWORD` sẽ là mật khẩu mặc định user khi truy cập vào database.

### Thiết lập biến môi trường
Tạo file `.env` tại thư mục gốc nếu chưa tồn tại và thêm các trường thông tin tương ứng vào. Ví dụ:

```bash
    DB_URL=postgres://postgres:ltp2204@localhost:5432/online-news
```

Với `user` mặc định là `postgres`, `password` là mật khẩu khi nãy vừa thiết lập ở bước trước.

## Chạy chương trình

### Môi trường dev

Chạy command sau để chạy được app với môi trường dev

``` bash
    npm run dev
```

App sẽ được khởi chạy tại [http://localhost:3000](http://localhost:3000) theo mặc định.

### Test by VPN