curl --location 'http://localhost:3000/groceries/' \
--header 'user-id: 1ee06d5a-003e-4969-9f1f-c2fa03763399' \
--header 'Content-Type: application/json' \
--data '{
    "name": "abc",
    "category": "snacks",
    "description": "fresh milk",
    "price": 36.5,
    "quantity": 2
}'


curl --location 'http://localhost:3000/groceries/?page=1&pagesize=2' \
--header 'user-id: 1ee06d5a-003e-4969-9f1f-c2fa03763399' \
--header 'Content-Type: application/json'


curl --location --request DELETE 'http://localhost:3000/groceries?groceryId=3f2dc1a7-8745-48f2-86c8-a1873803675d' \
--header 'user-id: 1ee06d5a-003e-4969-9f1f-c2fa03763399' \
--header 'Content-Type: application/json'


curl --location --request PUT 'http://localhost:3000/groceries/?groceryId=c99b04c1-c635-4de6-80e7-652879b25125' \
--header 'user-id: 1ee06d5a-003e-4969-9f1f-c2fa03763399' \
--header 'Content-Type: application/json' \
--data '{
    "name": "yogurt"
}'

curl --location --request PUT 'http://localhost:3000/groceries/inventory?groceryId=c99b04c1-c635-4de6-80e7-652879b25125&quantity=5' \
--header 'user-id: 1ee06d5a-003e-4969-9f1f-c2fa03763399' \
--header 'Content-Type: application/json'


curl --location 'http://localhost:3000/order/' \
--header 'user-id: 1ee06d5a-003e-4969-9f1f-c2fa03763399' \
--header 'Content-Type: application/json' \
--data '[
    {
        "groceryId": "8b979456-d1a8-48bc-adcb-d5d3e1bfbebe",
        "quantity": 2
    },
    {
        "groceryId": "688205cc-7595-4061-9ad1-8f5976c63c1a",
        "quantity": 1
    },
    {
        "groceryId": "464c7048-d26b-4d13-8ddf-d658c0eb0387",
        "quantity": 1
    }
]'