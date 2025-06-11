export interface ToolsKeyValue {
    id: string;
    code: string;
    type: string;
    value: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface ToolsCreateKeyValue {
    id: string;
    code: string;
    type: string;
    value: string;
    isActive: boolean;
}

export interface ToolsUpdateKeyValueById {
    id: string;
    code?: string;
    type?: string;
    value?: string;
    isActive?: boolean;
}

export interface ToolsUpdateKeyValues {
    id?: string;
    code?: string;
    type?: string;
    value?: string;
    isActive?: boolean;
}
