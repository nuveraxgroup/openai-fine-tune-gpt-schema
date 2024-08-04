# OpenAI Fine-tune GPT JSON Schema

The file [gpt-3.5-4o.schema.json](gpt-3.5-4o.schema.json) allows us to validate JSON Lines object described on the next
[documentation](https://cookbook.openai.com/examples/chat_finetuning_data_prep) for fine-tunning using JSON Schema validators.

## How to implement validation using Node.js

Install Ajv library
```shell
npm install ajv
```

Run validation
```typescript
import Ajv from "ajv";

const ajv = new Ajv();

const sampleData = {
    messages: [
        { role: 'system', content: 'Marv is a factual...' },
        { role: 'user', content: 'Whats the...' },
        { role: 'assistant', content: 'Paris, as if...' }
    ]
};

const gpt305And4oSchema = { /* Get schema from the repository or download locally */ }

const isDataValid = ajv.validate(
    gpt305And4oSchema,
    sampleData
);

if (isDataValid) {
    console.log( "Valid fine-tune sample for gpt3.5 or 4o-mini" );
} else {
    console.error("Something is missing in your fine-tune sample:", ajv.errors);
}
```
