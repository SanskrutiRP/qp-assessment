Intuition behind the solution

Given problem statement - inventory management system
The system on high level is something similar to insta mart/ blinkit

2 components of the system
    1 - Admin (responsible for managing the platform)
    2 - Customer/ User (who uses the platform)


Admin can do anything with the groceries like as adding, updating the grocery, managing the inventory 
While User can just add those items in cart and place order

SO considering the above given scenarios 

Below are the APIs required for the system

1. Add grocery - with this API admin can add quantity also
curl --location 'http://localhost:3000/groceries/' \
--header 'user-id: 1ee06d5a-003e-4969-9f1f-c2fa03763399' \
--header 'Content-Type: application/json' \
--data '{
    "name": "milk",
    "category": "snacks",
    "description": "fresh milk",
    "price": 36.5,
    "quantity": 2
}'


2. Fetch groceries available on platform
curl --location 'http://localhost:3000/groceries/?page=1&pagesize=2' \
--header 'user-id: 1ee06d5a-003e-4969-9f1f-c2fa03763399' \
--header 'Content-Type: application/json'

3. Delete grocery on platform
curl --location --request DELETE 'http://localhost:3000/groceries?groceryId=3f2dc1a7-8745-48f2-86c8-a1873803675d' \
--header 'user-id: 1ee06d5a-003e-4969-9f1f-c2fa03763399' \
--header 'Content-Type: application/json'

4. Update the grocery details like as description, price
curl --location --request PUT 'http://localhost:3000/groceries/?groceryId=c99b04c1-c635-4de6-80e7-652879b25125' \
--header 'user-id: 1ee06d5a-003e-4969-9f1f-c2fa03763399' \
--header 'Content-Type: application/json' \
--data '{
    "price": 40
}'

5. Update inventory details
curl --location --request PUT 'http://localhost:3000/groceries/inventory?groceryId=c99b04c1-c635-4de6-80e7-652879b25125&quantity=5' \
--header 'user-id: 1ee06d5a-003e-4969-9f1f-c2fa03763399' \
--header 'Content-Type: application/json'

6. Placing the order - multiple items at a time
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
