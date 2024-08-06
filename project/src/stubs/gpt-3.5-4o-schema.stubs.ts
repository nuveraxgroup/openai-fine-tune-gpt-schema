import { Gtp305And4oSchema } from "../models";
import { Message } from '../models/gpt-3.5-4o-schema.model';

export const EMPTY_OBJECT: Gtp305And4oSchema = { }
export const MESSAGE_PROPERTY_EMPTY: Gtp305And4oSchema = { messages: [] }

const DEFAULT_SYSTEM_MESSAGE: Message = { role: 'system', content: 'A system example message' };
const DEFAULT_USER_MESSAGE: Message = { role: 'user', content: 'A user example message'  };
const DEFAULT_ASSISTANT_MESSAGE: Message = { role: 'assistant', content: 'A assistant example message'};
const DEFAULT_ASSISTANT_FUNC_CALL_MESSAGE: Message = { role: 'assistant', function_call: { name: 'func_name', arguments: '{"message": "abc"}' } };
const DEFAULT_ASSISTANT_CONTENT_FUNC_CALL_MESSAGE: Message = { role: 'assistant', content: 'A assistant example message', function_call: { name: 'func_name', arguments: '{"message": "abc"}' } };

export const ONLY_SYSTEM_MESSAGE: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE
  ]
}
export const SIMPLE_VALID_MESSAGE: Gtp305And4oSchema = {
  messages: [
    DEFAULT_SYSTEM_MESSAGE,
    DEFAULT_USER_MESSAGE,
    DEFAULT_ASSISTANT_MESSAGE
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
    { role: 'assistant'}
  ]
}