/*
All the parameters defined on the model are intentionally optional. We can test possible undefined or null values.
 */
export type FunctionCall = {
    name?: string;
    arguments?: string;
}

export type Message = {
    role?: 'system' | 'user' | 'assistant' | 'function';
    content?: string;
    name?: string;
    function_call?: FunctionCall;
    weight?: number;
    [name: string]: any;
}

export type Parameter = {
    type?: 'null' | 'boolean' | 'object' | 'array' | 'number' | 'integer' | 'string';
    properties?: any;
    required?: string[];
}

export type FunctionModel = {
    name?: string;
    description?: string;
    parameters?: Parameter;
}

export type Gtp305And4oSchema = {
    messages?: Message[];
    functions?: FunctionModel[];
    [name: string]: any;
}