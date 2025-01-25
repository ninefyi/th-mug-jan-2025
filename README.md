# th-mug-jan-2025
THMUG Jan 2025 Meetup

1. References: https://www.mongodb.com/developer/products/mongodb/generate-mql-with-mongosh-and-openai/
2. Create .env file and add AZURE_OAI_API_KEY and AZURE_OAI_ENDPOINT
3. Download sample data ```curl -OL https://atlas-education.s3.amazonaws.com/sampledata.archive -o sampledata.archive```
4. Install node_modules: ```npm install dotenv axios```
5. Connect MongoDB using MongoDB Shell: ```mongosh```
6. Inside MongoDB Shell run: ```load("text2Mql.js")```