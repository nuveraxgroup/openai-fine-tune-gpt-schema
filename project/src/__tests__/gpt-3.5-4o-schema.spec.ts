import Ajv from 'ajv/dist/2020'
import { GPT_305_AND_4O_SCHEMA } from "../json-schema/schema";
import { EMPTY_OBJECT } from "../stubs";
import {
    ASSISTANT_MISSING_CONTENT_MSG,
    ASSISTANT_WITH_FUNC_CALL, ASSISTANT_WITH_FUNC_CALL_AND_CONTENT, MESSAGE_PROPERTY_EMPTY,
    ONLY_SYSTEM_MESSAGE,
    SIMPLE_VALID_MESSAGE
} from '../stubs/gpt-3.5-4o-schema.stubs';

const ajv = new Ajv({strict:false});
const validate = ajv.compile(GPT_305_AND_4O_SCHEMA);

describe('Gpt 3.5 and 4o schema tests', () => {
    it('Valid simple messages', () => {
        const valid = validate(SIMPLE_VALID_MESSAGE);
        expect(validate.errors).toBe(null);
        expect(valid).toBe(true);
    });

    it('Valid assistant with function call and `content` property removed', () => {
        const valid = validate(ASSISTANT_WITH_FUNC_CALL);
        expect(validate.errors).toBe(null);
        expect(valid).toBe(true);
    });

    it('Valid assistant with function call and content message', () => {
        const valid = validate(ASSISTANT_WITH_FUNC_CALL_AND_CONTENT);
        expect(validate.errors).toBe(null);
        expect(valid).toBe(true);
    });

    it('Missing `assistant` -> `content` property', () => {
        const valid = validate(ASSISTANT_MISSING_CONTENT_MSG)
        const errors = validate.errors;
        expect(errors.length).toBe(1);
        expect(errors[0].instancePath).toBe("/messages/2");
        expect(errors[0].schemaPath).toBe('#/properties/messages/items/allOf/1/else/required');
        expect(errors[0].message).toBe("must have required property 'content'");
        expect(errors[0].params["missingProperty"]).toBe("content");
        expect(errors[0].keyword).toBe("required");
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

    it('Property `messages` empty elements', () => {
        const valid = validate(MESSAGE_PROPERTY_EMPTY)
        const errors = validate.errors;
        expect(errors.length).toBe(1);
        expect(errors[0].instancePath).toBe("/messages");
        expect(errors[0].schemaPath).toBe("#/properties/messages/minItems");
        expect(errors[0].message).toBe( "must NOT have fewer than 3 items");
        expect(errors[0].params["limit"]).toBe(3);
        expect(errors[0].keyword).toBe("minItems");
        expect(valid).toBe(false);
    });

    it('Only one `messages` element', () => {
        const valid = validate(ONLY_SYSTEM_MESSAGE)
        const errors = validate.errors;
        expect(errors.length).toBe(1);
        expect(errors[0].instancePath).toBe("/messages");
        expect(errors[0].schemaPath).toBe("#/properties/messages/minItems");
        expect(errors[0].message).toBe( "must NOT have fewer than 3 items");
        expect(errors[0].params["limit"]).toBe(3);
        expect(errors[0].keyword).toBe("minItems");
        expect(valid).toBe(false);
    });


});
