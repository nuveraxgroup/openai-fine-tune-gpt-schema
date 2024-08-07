import { Gtp305And4oSchema } from "../models";
import { Message } from '../models/gpt-3.5-4o-schema.model';

export const EMPTY_OBJECT: Gtp305And4oSchema = { }
export const MESSAGE_PROPERTY_EMPTY: Gtp305And4oSchema = { messages: [] }

const DEFAULT_SYSTEM_MESSAGE: Message = { role: 'system', content: 'A system example message' };
const DEFAULT_USER_MESSAGE: Message = { role: 'user', content: 'A user example message' };
const DEFAULT_ASSISTANT_MESSAGE: Message = { role: 'assistant', content: 'A assistant example message'};
const DEFAULT_ASSISTANT_FUNC_CALL_MESSAGE: Message = { role: 'assistant', function_call: { name: 'func_name', arguments: '{"message": "abc"}' } };
const DEFAULT_ASSISTANT_CONTENT_FUNC_CALL_MESSAGE: Message = { role: 'assistant', content: 'A assistant example message', function_call: { name: 'func_name', arguments: '{"message": "abc"}' } };
const DEFAULT_FUNCTION_MESSAGE: Message = { role: 'function', name: 'my_func', content: 'A function example message'};

export const REPEATED_MESSAGES: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    DEFAULT_ASSISTANT_MESSAGE,
    DEFAULT_FUNCTION_MESSAGE,
    DEFAULT_USER_MESSAGE,
    DEFAULT_ASSISTANT_MESSAGE,
  ]
}

export const ONLY_SYSTEM_MESSAGE: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE
  ]
}

export const SIMPLE_VALID_MESSAGE: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    DEFAULT_ASSISTANT_MESSAGE,
    DEFAULT_FUNCTION_MESSAGE
  ]
}

export const ASSISTANT_WITH_FUNC_CALL: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    DEFAULT_ASSISTANT_FUNC_CALL_MESSAGE
  ]
}

export const ASSISTANT_WITH_FUNC_CALL_AND_CONTENT: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    DEFAULT_ASSISTANT_CONTENT_FUNC_CALL_MESSAGE
  ]
}

export const ASSISTANT_MISSING_CONTENT_MSG: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    { role: 'assistant' }
  ]
}

export const ASSISTANT_MESSAGES_WITH_WEIGHTS: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    { role: 'assistant', content: "A assistant example message", weight: 0 },
    { role: 'user', content: 'A user example message 2' },
    { role: 'assistant', content: "A assistant example message", weight: 1 }
  ]
}

export const FUNCTION_MISSING_CONTENT: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    { role: 'function', name: 'my_func' }
  ]
}

export const FUNCTION_MISSING_NAME: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    { role: 'function', content: 'A function example message' }
  ]
}

export const FUNCTION_MISSING_NAME_AND_CONTENT: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    { role: 'function' }
  ]
}

export const MESSAGES_WITH_FUNC_LIST: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    DEFAULT_ASSISTANT_CONTENT_FUNC_CALL_MESSAGE
  ],
  functions: [
    {
      name: 'func_name',
      description: 'My function description',
      parameters: {
        type: "object",
        properties: { message: { type: "string" } },
        required: ["message"] }
    }
  ]
}

export const MESSAGES_WITH_EMPTY_FUNC_LIST: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    DEFAULT_ASSISTANT_CONTENT_FUNC_CALL_MESSAGE
  ],
  functions: [ ]
}

export const MESSAGES_WITH_FUNC_ITEM_WITH_NAME_ONLY: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    DEFAULT_ASSISTANT_CONTENT_FUNC_CALL_MESSAGE
  ],
  functions: [ { name: 'func_name' } ]
}

export const MESSAGES_WITH_FUNC_ITEM_WITH_NAME_DESCRIPTION_ONLY: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    DEFAULT_ASSISTANT_CONTENT_FUNC_CALL_MESSAGE
  ],
  functions: [ { name: 'func_name', description: "My function description" } ]
}

export const EXTRA_PROPERTY: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    DEFAULT_ASSISTANT_MESSAGE,
    DEFAULT_FUNCTION_MESSAGE
  ],
  functions: [
    {
      name: 'func_name',
      description: 'My function description',
      parameters: {
        type: "object",
        properties: { message: { type: "string" } },
        required: ["message"] }
    }
  ],
  newProperty: "My new property"
}