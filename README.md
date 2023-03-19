
# NodeJS E-Commerce Basic Rest Api

NodeJS and MongoDB basic rest api.

## Install
```bash 
  npm i nodejs-restapi
```

## Running in a Developer Environment

```bash
  npm run dev
```

## Configuration

#### Env File Editing
```env
#Stack displays in the error output during development, if production is set, it is not displayed.

NODE_ENV=development

#Application Settings

APP_NAME="Restfull Api"
APP_PORT=3000
APP_URL=http://localhost
APP_HOSTNAME=localhost #It is the hostname that ExpressJS uses.

DB_HOST=127.0.0.1 #mongodb host
DB_PORT=27017 #mongodb port
DB_NAME= #mongodb db name

#If disk is selected, the uploaded image will be moved to public/images. If s3 is selected, the uploaded image will be uploaded to aws s3 cloud storage.

FILE_UPLOAD=disk

#It uses jwt for authentication. You must enter the secret keys here.

JWT_ACCESS_SECRET_KEY=
JWT_REFRESH_SECRET_KEY=

#If FILE_UPLOAD field is selected as s3, aws settings must be made.

AWS_S3_ACCESS_KEY_ID=
AWS_S3_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_S3_REGION=
AWS_S3_ACL=

```

## API Usage

#### User Routes

```http
The following routes can be used by logged in users.

Bearer {token} is required on all routes.

GET /api/v1/users
PATCH /api/v1/users
DELETE /api/v1/users
PATCH /api/v1/users/password-change
```
| Request | Route     | Descripiton                       |
| :-------- | :------- | :-------------------------------- |
| GET      | /api/v1/users | Displays the logged in user's information. |
| PATCH      | /api/v1/users | Updates user information. {first_name,last_name,email} any field can be updated.|
| DELETE      | /api/v1/users | Deletes the user. |
| PATCH      | /api/v1/users | Updates user password. {password} field is required. |

```http
POST /api/v1/users
POST /api/v1/users/password-reset
POST /api/v1/users/password-reset/:token
POST /api/v1/users/login
```
| Request | Route     | Descripiton                       |
| :-------- | :------- | :-------------------------------- |
| POST      | /api/v1/users | Creates a new user. {first_name,last_name,email,password} fields are required. |
| POST      | /api/v1/users/password-reset | It sends a password reset link to the registered email address. The {email} field is required. |
| POST      | /api/v1/users/login | User login. {email,password} fields are required.|


```http
POST /api/v1/users/password-reset/:token
```

| Parameter | Type     | Descripiton                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | It is the password reset link sent to the e-mail address, it receives an ?email query at the end. |

#### Login Process

```http
  POST /api/v1/users
```

Sample output of logged in user

```json
{
    "user": {
        "_id": "XXXXXXXXXXXXXXXXXXX",
        "first_name": "Jhon",
        "last_name": "Doe",
        "email": "mail@mail.com"
    },
    "tokens": {
        "access_token": "Foo",
        "refresh_token": "Bar"
    }
}
```

#### Category Routes

```http
GET /api/v1/categories
GET /api/v1/categories/:id
POST /api/v1/categories
PATCH /api/v1/categories/:id
DELETE /api/v1/categories/:id
```
| Request | Route     | Descripiton                       |
| :-------- | :------- | :-------------------------------- |
| GET      | /api/v1/categories | Brings all categories. |
| GET      | /api/v1/categories/:id | The :id returns the category. |
| POST      | /api/v1/categories | Creates a new category. The {name} field is required. The slug field is created automatically. |
| PATCH      | /api/v1/categories/:id | Updates the category with the :id parameter. |
| DELETE      | /api/v1/categories/:id | Deletes the category with the :id parameter. |

#### Product Routes

```http
GET /api/v1/products
GET /api/v1/products/:id
POST /api/v1/products
PATCH /api/v1/products/:id
DELETE /api/v1/products/:id
```
| Request | Route     | Descripiton                       |
| :-------- | :------- | :-------------------------------- |
| GET      | /api/v1/products | It brings all the products. |
| GET      | /api/v1/products/:id | Brings the product with :id.|
| POST      | /api/v1/products | Creates a new product. The {name,price,quantity,image,category_id,description} field is required. Slug,SKU field is created automatically. |
| PATCH      | /api/v1/products/:id | Updates the product with the :id parameter. |
| DELETE      | /api/v1/products/:id | Deletes the product with the :id parameter. |

#### User Address Routes

```http
GET /api/v1/user-address
GET /api/v1/user-address/:id
POST /api/v1/user-address
PATCH /api/v1/user-address/:id
DELETE /api/v1/user-address/:id
```
| Request | Route     | Descripiton                       |
| :-------- | :------- | :-------------------------------- |
| GET      | /api/v1/user-address | Returns all addresses. |
| GET      | /api/v1/user-address/:id | The :id returns the address. |
| POST      | /api/v1/user-address | Creates a new address. The {user_id,phone_number,country,city,street1,state,zip} field is required. The {stree2} field can be created optionally. |
| PATCH      | /api/v1/user-address/:id | Updates the address with the :id parameter. |
| DELETE      | /api/v1/user-address/:id | It deletes the address with the :id parameter. |



  