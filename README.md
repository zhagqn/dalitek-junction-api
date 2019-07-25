# dalitek-junction-api

## 方法命名规范

### 所有接口链式层级和后台目录一致

`/util/now/` => `$api.util.now()`

### URL 中带有变量则跳过变量，变量部分改为传参

`/video/:episode_id/play_info/` => `$api.video.play_info(episode_id)`

### 接口名称一样，HTTP 方法不同

#### GET 方法:

`/cart/` => `$api.cart.get()`

`/cart/:id` => `$api.cart.get(id)`

#### POST 方法:

`/cart/` => `$api.cart.post()`

#### PUT 方法

`/cart/:id` => `$api.cart.update(id)`

#### DELETE 方法

`/cart/:id` => `$api.cart.delete(id)`
