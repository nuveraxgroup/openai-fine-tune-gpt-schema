import Ajv from 'ajv/dist/2019'
import Ajv07 from 'ajv'
import { GPT_305_AND_4O_SCHEMA, GPT_305_AND_4O_DRAFT_07_SCHEMA } from '../json-schema/schema';
import { EMPTY_OBJECT } from '../stubs';
import {
    ASSISTANT_MESSAGES_WITH_WEIGHTS,
    ASSISTANT_MISSING_CONTENT_MSG,
    ASSISTANT_WITH_FUNC_CALL,
    ASSISTANT_WITH_FUNC_CALL_AND_CONTENT,
    ASSISTANT_WITH_FUNC_CALL_WITH_EMPTY_PROPERTIES,
    EXTRA_MESSAGE_PROPERTY,
    EXTRA_PROPERTY,
    FUNCTION_MISSING_CONTENT,
    FUNCTION_MISSING_NAME,
    FUNCTION_MISSING_NAME_AND_CONTENT, FUNCTIONS_WITH_EMPTY_PROPERTIES,
    MESSAGE_PROPERTY_EMPTY,
    MESSAGES_WITH_EMPTY_CONTENTS,
    MESSAGES_WITH_EMPTY_FUNC_LIST,
    MESSAGES_WITH_FUNC_ITEM_WITH_NAME_DESCRIPTION_ONLY,
    MESSAGES_WITH_FUNC_ITEM_WITH_NAME_ONLY,
    MESSAGES_WITH_FUNC_LIST,
    ONLY_SYSTEM_MESSAGE,
    REPEATED_MESSAGES,
    SIMPLE_VALID_MESSAGE
} from '../stubs/gpt-3.5-4o-schema.stubs';

const ajv = new Ajv({ allErrors: true, strict: false });
const ajv07 = new Ajv07({ allErrors: true, strict: false });

describe.each(['draft2019', 'draft07'])('Gpt 3.5 and 4o schema %s tests', (version ) => {
    const validate = version === 'draft2019' ? ajv.compile(GPT_305_AND_4O_SCHEMA) :
      ajv07.compile(GPT_305_AND_4O_DRAFT_07_SCHEMA);

    it('Valid simple messages', () => {
        const valid = validate(SIMPLE_VALID_MESSAGE);
        expect(validate.errors).toBe(null);
        expect(valid).toBe(true);
    });

    it('Valid assistant with function call and missing `content` property', () => {
        const valid = validate(ASSISTANT_WITH_FUNC_CALL);
        expect(validate.errors).toBe(null);
        expect(valid).toBe(true);
    });

    it('Valid assistant with function call and content message', () => {
        const valid = validate(ASSISTANT_WITH_FUNC_CALL_AND_CONTENT);
        expect(validate.errors).toBe(null);
        expect(valid).toBe(true);
    });

    it('Valid assistant with function call and `functions` list', () => {
        const valid = validate(MESSAGES_WITH_FUNC_LIST);
        expect(validate.errors).toBe(null);
        expect(valid).toBe(true);
    });

    it('Valid assistant messages with weights definitions', () => {
        const valid = validate(ASSISTANT_MESSAGES_WITH_WEIGHTS);
        expect(validate.errors).toBe(null);
        expect(valid).toBe(true);
    });

    it('Missing `function` -> `content` property', () => {
        const valid = validate(FUNCTION_MISSING_CONTENT)
        const errors = validate.errors;
        expect(errors.length).toBe(2);
        expect(errors[0].instancePath).toBe("/messages/3");
        expect(errors[0].schemaPath).toBe('#/properties/messages/items/allOf/0/then/required');
        expect(errors[0].message).toBe("must have required property 'content'");
        expect(errors[0].params["missingProperty"]).toBe("content");
        expect(errors[0].keyword).toBe("required");
        expect(valid).toBe(false);
    });

    it('Missing `function` -> `name` property', () => {
        const valid = validate(FUNCTION_MISSING_NAME)
        const errors = validate.errors;
        expect(errors.length).toBe(2);
        expect(errors[0].instancePath).toBe("/messages/3");
        expect(errors[0].schemaPath).toBe('#/properties/messages/items/allOf/0/then/required');
        expect(errors[0].message).toBe("must have required property 'name'");
        expect(errors[0].params["missingProperty"]).toBe("name");
        expect(errors[0].keyword).toBe("required");
        expect(valid).toBe(false);
    });

    it('Missing `function` -> `name` and `content` properties', () => {
        const valid = validate(FUNCTION_MISSING_NAME_AND_CONTENT)
        const errors = validate.errors;
        expect(errors.length).toBe(3);
        expect(errors[0].instancePath).toBe("/messages/3");
        expect(errors[0].schemaPath).toBe('#/properties/messages/items/allOf/0/then/required');
        expect(errors[0].message).toBe("must have required property 'content'");
        expect(errors[0].params["missingProperty"]).toBe("content");
        expect(errors[0].keyword).toBe("required");

        expect(errors[1].instancePath).toBe("/messages/3");
        expect(errors[1].schemaPath).toBe('#/properties/messages/items/allOf/0/then/required');
        expect(errors[1].message).toBe("must have required property 'name'");
        expect(errors[1].params["missingProperty"]).toBe("name");
        expect(errors[1].keyword).toBe("required");

        expect(valid).toBe(false);
    });

    it('Missing `assistant` -> `content` and `function_call` properties', () => {
        const valid = validate(ASSISTANT_MISSING_CONTENT_MSG)
        const errors = validate.errors;
        expect(errors.length).toBe(4);
        expect(errors[0].instancePath).toBe("/messages/2");
        expect(errors[0].schemaPath).toBe('#/properties/messages/items/allOf/1/then/anyOf/0/required');
        expect(errors[0].message).toBe("must have required property 'content'");
        expect(errors[0].params["missingProperty"]).toBe("content");
        expect(errors[0].keyword).toBe("required");

        expect(errors[1].instancePath).toBe("/messages/2");
        expect(errors[1].schemaPath).toBe('#/properties/messages/items/allOf/1/then/anyOf/1/required');
        expect(errors[1].message).toBe("must have required property 'function_call'");
        expect(errors[1].params["missingProperty"]).toBe("function_call");
        expect(errors[1].keyword).toBe("required");

        expect(valid).toBe(false);
    });

    it('Missing `messages` property', () => {
        const valid = validate(EMPTY_OBJECT)
        const errors = validate.errors;
        expect(errors.length).toBe(1);
        expect(errors[0].instancePath).toBe("");
        expect(errors[0].schemaPath).toBe("#/required");
        expect(errors[0].message).toBe("must have required property 'messages'");
        expect(errors[0].params["missingProperty"]).toBe("messages");
        expect(errors[0].keyword).toBe("required");
        expect(valid).toBe(false);
    });

    it('Invalid property `messages` empty elements', () => {
        const valid = validate(MESSAGE_PROPERTY_EMPTY)
        const errors = validate.errors;
        expect(errors.length).toBe(2);
        expect(errors[0].instancePath).toBe("/messages");
        expect(errors[0].schemaPath).toBe("#/properties/messages/minItems");
        expect(errors[0].message).toBe( "must NOT have fewer than 3 items");
        expect(errors[0].params["limit"]).toBe(3);
        expect(errors[0].keyword).toBe("minItems");

        expect(errors[1].instancePath).toBe("/messages");
        expect(errors[1].schemaPath).toBe('#/properties/messages/contains');
        expect(errors[1].message).toBe( 'must contain at least 1 valid item(s)');
        expect(errors[1].params["minContains"]).toBe(1);
        expect(errors[1].keyword).toBe("contains");

        expect(valid).toBe(false);
    });

    it('Invalid only one `messages` element', () => {
        const valid = validate(ONLY_SYSTEM_MESSAGE)
        const errors = validate.errors;

        expect(errors.length).toBe(3);
        expect(errors[0].instancePath).toBe("/messages");
        expect(errors[0].schemaPath).toBe("#/properties/messages/minItems");
        expect(errors[0].message).toBe( "must NOT have fewer than 3 items");
        expect(errors[0].params["limit"]).toBe(3);
        expect(errors[0].keyword).toBe("minItems");

        expect(errors[1].instancePath).toBe("/messages/0/role");
        expect(errors[1].schemaPath).toBe('#/properties/messages/contains/properties/role/const');
        expect(errors[1].message).toBe( 'must be equal to constant');
        expect(errors[1].params["allowedValue"]).toBe('assistant');
        expect(errors[1].keyword).toBe("const");
        expect(valid).toBe(false);
    });

    it('Invalid repeated messages', () => {
        const valid = validate(REPEATED_MESSAGES);
        const errors = validate.errors;
        expect(errors.length).toBe(1);
        expect(errors[0].instancePath).toBe("/messages");
        expect(errors[0].schemaPath).toBe("#/properties/messages/uniqueItems");
        expect(errors[0].message).toBe( "must NOT have duplicate items (items ## 2 and 5 are identical)");
        expect(errors[0].params["i"]).toBe(5);
        expect(errors[0].params["j"]).toBe(2);
        expect(errors[0].keyword).toBe("uniqueItems");
        expect(valid).toBe(false);
    });

    it('Invalid empty `functions` list', () => {
        const valid = validate(MESSAGES_WITH_EMPTY_FUNC_LIST);
        const errors = validate.errors;
        expect(errors.length).toBe(1);
        expect(errors[0].instancePath).toBe("/functions");
        expect(errors[0].schemaPath).toBe('#/properties/functions/minItems');
        expect(errors[0].message).toBe( 'must NOT have fewer than 1 items');
        expect(errors[0].params["limit"]).toBe(1);
        expect(errors[0].keyword).toBe("minItems");
        expect(valid).toBe(false);
    });

    it('Invalid `functions` item with only `name` property', () => {
        const valid = validate(MESSAGES_WITH_FUNC_ITEM_WITH_NAME_ONLY);
        const errors = validate.errors;

        expect(errors.length).toBe(2);
        expect(errors[0].instancePath).toBe("/functions/0");
        expect(errors[0].schemaPath).toBe('#/properties/functions/items/required');
        expect(errors[0].message).toBe( "must have required property 'description'");
        expect(errors[0].params["missingProperty"]).toBe('description');
        expect(errors[0].keyword).toBe("required");

        expect(errors[1].instancePath).toBe("/functions/0");
        expect(errors[1].schemaPath).toBe('#/properties/functions/items/required');
        expect(errors[1].message).toBe( "must have required property 'parameters'");
        expect(errors[1].params["missingProperty"]).toBe('parameters');
        expect(errors[1].keyword).toBe("required");

        expect(valid).toBe(false);
    });

    it('Invalid `functions` item with only `name` and `description` property', () => {
        const valid = validate(MESSAGES_WITH_FUNC_ITEM_WITH_NAME_DESCRIPTION_ONLY);
        const errors = validate.errors;
        expect(errors.length).toBe(1);
        expect(errors[0].instancePath).toBe("/functions/0");
        expect(errors[0].schemaPath).toBe('#/properties/functions/items/required');
        expect(errors[0].message).toBe( "must have required property 'parameters'");
        expect(errors[0].params["missingProperty"]).toBe('parameters');
        expect(errors[0].keyword).toBe("required");
        expect(valid).toBe(false);
    });

    it('Only allow `messages` and `functions` properties', () => {
        const valid = validate(EXTRA_PROPERTY);
        const errors = validate.errors;
        expect(errors.length).toBe(1);
        expect(errors[0].instancePath).toBe("");
        expect(errors[0].schemaPath).toBe('#/additionalProperties');
        expect(errors[0].message).toBe( 'must NOT have additional properties');
        expect(errors[0].params["additionalProperty"]).toBe('newProperty');
        expect(errors[0].keyword).toBe("additionalProperties");
        expect(valid).toBe(false);
    });

    it('Only allow in `messages` the next properties: `role`, `content`, `name`, `function_call`, `weight`', () => {
        const valid = validate(EXTRA_MESSAGE_PROPERTY);
        const errors = validate.errors;

        expect(errors.length).toBe(1);
        expect(errors[0].instancePath).toBe('/messages/4');
        expect(errors[0].schemaPath).toBe('#/properties/messages/items/additionalProperties');
        expect(errors[0].message).toBe( 'must NOT have additional properties');
        expect(errors[0].params["additionalProperty"]).toBe('newProperty');
        expect(errors[0].keyword).toBe("additionalProperties");
        expect(valid).toBe(false);
    });

    it('Validate blank `messages` -> `content`', () => {
        const valid = validate(MESSAGES_WITH_EMPTY_CONTENTS);
        const errors = validate.errors;

        expect(errors.length).toBe(5);
        expect(errors[0].instancePath).toBe("/messages/0/content");
        expect(errors[0].schemaPath).toBe('#/properties/messages/items/properties/content/pattern');
        expect(errors[0].message).toBe( 'must match pattern "^(?!\\s*$).+"');
        expect(errors[0].params["pattern"]).toBe('^(?!\\s*$).+');
        expect(errors[0].keyword).toBe("pattern");

        expect(errors[1].instancePath).toBe("/messages/1/content");
        expect(errors[1].schemaPath).toBe('#/properties/messages/items/properties/content/pattern');
        expect(errors[1].message).toBe( 'must match pattern "^(?!\\s*$).+"');
        expect(errors[1].params["pattern"]).toBe('^(?!\\s*$).+');
        expect(errors[1].keyword).toBe("pattern");

        expect(errors[2].instancePath).toBe("/messages/2/content");
        expect(errors[2].schemaPath).toBe('#/properties/messages/items/properties/content/pattern');
        expect(errors[2].message).toBe( 'must match pattern "^(?!\\s*$).+"');
        expect(errors[2].params["pattern"]).toBe('^(?!\\s*$).+');
        expect(errors[2].keyword).toBe("pattern");

        expect(errors[3].instancePath).toBe("/messages/3/content");
        expect(errors[3].schemaPath).toBe('#/properties/messages/items/properties/content/pattern');
        expect(errors[3].message).toBe( 'must match pattern "^(?!\\s*$).+"');
        expect(errors[3].params["pattern"]).toBe('^(?!\\s*$).+');
        expect(errors[3].keyword).toBe("pattern");

        expect(errors[4].instancePath).toBe("/messages/4/content");
        expect(errors[4].schemaPath).toBe('#/properties/messages/items/properties/content/pattern');
        expect(errors[4].message).toBe( 'must match pattern "^(?!\\s*$).+"');
        expect(errors[4].params["pattern"]).toBe('^(?!\\s*$).+');
        expect(errors[4].keyword).toBe("pattern");

        expect(valid).toBe(false);
    });

    it('Validate blank `messages` -> `role: assistant` -> `function_call` -> `name` and `arguments`', () => {
        const valid = validate(ASSISTANT_WITH_FUNC_CALL_WITH_EMPTY_PROPERTIES);
        const errors = validate.errors;

        expect(errors.length).toBe(2);
        expect(errors[0].instancePath).toBe("/messages/2/function_call/name");
        expect(errors[0].schemaPath).toBe('#/properties/messages/items/properties/function_call/properties/name/pattern');
        expect(errors[0].message).toBe( 'must match pattern "^(?!\\s*$).+"');
        expect(errors[0].params["pattern"]).toBe('^(?!\\s*$).+');
        expect(errors[0].keyword).toBe("pattern");

        expect(errors[1].instancePath).toBe("/messages/2/function_call/arguments");
        expect(errors[1].schemaPath).toBe('#/properties/messages/items/properties/function_call/properties/arguments/pattern');
        expect(errors[1].message).toBe( 'must match pattern "^(?!\\s*$).+"');
        expect(errors[1].params["pattern"]).toBe('^(?!\\s*$).+');
        expect(errors[1].keyword).toBe("pattern");

        expect(valid).toBe(false);
    });

    it('Validate blank `functions` -> `name` and `description`', () => {
        const valid = validate(FUNCTIONS_WITH_EMPTY_PROPERTIES);
        const errors = validate.errors;

        expect(errors.length).toBe(2);
        expect(errors[0].instancePath).toBe('/functions/0/name');
        expect(errors[0].schemaPath).toBe('#/properties/functions/items/properties/name/pattern');
        expect(errors[0].message).toBe( 'must match pattern "^(?!\\s*$).+"');
        expect(errors[0].params["pattern"]).toBe('^(?!\\s*$).+');
        expect(errors[0].keyword).toBe("pattern");

        expect(errors[1].instancePath).toBe('/functions/0/description');
        expect(errors[1].schemaPath).toBe('#/properties/functions/items/properties/description/pattern');
        expect(errors[1].message).toBe( 'must match pattern "^(?!\\s*$).+"');
        expect(errors[1].params["pattern"]).toBe('^(?!\\s*$).+');
        expect(errors[1].keyword).toBe("pattern");

        expect(valid).toBe(false);
    });
});
