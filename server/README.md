# Server Docs

## Authentication

All endpoints except `/login/google` require a valid JWT in the `Authorization: Bearer <token>` header.

---

## Endpoints

### POST /login/google
- **Body:** `{ token: string }`
- **Success Response:**
  - `200 OK` `{ message: string, access_token: string }`
- **Error Responses:**
  - `400` `{ error: 'Token is required' }`
  - `401/500` `{ message: 'Internal Server Error' }`

### GET /profile
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:**
  - `200 OK` `{ user: { id, name, email, ... } }`
- **Error Responses:**
  - `401` `{ message: 'Invalid Token' }`
  - `500` `{ message: 'Internal Server Error' }`

---

### GET /my-scenes
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:**
  - `200 OK` `{ message: string, collections: [ { id, title, UserId, ... } ] }`

### POST /my-scenes
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ title: string }`
- **Success Response:**
  - `201 Created` `{ message: string, canvas: { id, title, UserId, ... } }`
- **Error Responses:**
  - `400` `{ message: 'Title required' }`

### PUT /my-scenes/:id
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ title: string, scene?: object }`
- **Success Response:**
  - `200 OK` `{ message: string, updatedCanvas: { ... } }`
- **Error Responses:**
  - `404` `{ message: 'Canvas Not Found' }`
  - `403` `{ message: 'Forbidden Access' }`

### DELETE /my-scenes/:id
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:**
  - `200 OK` `{ message: 'Success delete canvas <title>' }`
- **Error Responses:**
  - `404` `{ message: 'Canvas Not Found' }`
  - `403` `{ message: 'Forbidden Access' }`

### GET /my-scenes/:id
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:**
  - `200 OK` `{ message: string, canvas: { ... } }`
- **Error Responses:**
  - `404` `{ message: 'Canvas Not Found' }`
  - `403` `{ message: 'Forbidden Access' }`

---

### POST /gemini/build
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ prompt: string }`
- **Success Response:**
  - `200 OK` `{ response: string }`
- **Error Responses:**
  - `400` `{ message: 'Prompt required' }`
  - `500` `{ message: 'Internal Server Error' }`

---

## Error Format
Most errors return `{ message: string }` or `{ error: string }`.

---

## Example Error Responses
- Validation: `{ message: 'Title required' }`
- Auth: `{ message: 'Invalid Token' }`
- Not Found: `{ message: 'Canvas Not Found' }`
- Forbidden: `{ message: 'Forbidden Access' }`
- Server: `{ message: 'Internal Server Error' }`
