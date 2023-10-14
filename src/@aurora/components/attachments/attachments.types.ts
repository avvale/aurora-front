export interface Attachment
{
    id: number;
    url: string;
    filename: string;
    mimetype: string;
    encoding: string;
    size: number;
    relativePathSegments: string[];
    
    
    familyId: string;
    sort: number;
    alt: string;
    title: string;
    path: string;
    extension: string;
    width: number;
    height: number;
    libraryId: string;
    libraryFilename: string;
    meta: any;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface DisplayedFile
{
    id: string;
    url: string;
    filename: string;
    mimetype: string;
    encoding: string;
    size: number;
    relativePathSegments: string[];
}

export interface AttachmentFamily
{
    id: number;
    name: string;
    code: string;
    width: number;
    height: number;
    fitType: CropType;
    quality: number;
    sizes: number[];
    format: ImageFormat;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export enum CropType
{
    FIT_CROP                = 'FIT_CROP',
    FIT_WIDTH               = 'FIT_WIDTH',
    FIT_HEIGHT              = 'FIT_HEIGHT',
    FIT_WIDTH_FREE_CROP     = 'FIT_WIDTH_FREE_CROP',
    FIT_HEIGHT_FREE_CROP    = 'FIT_HEIGHT_FREE_CROP',
}

export interface DisplayedFile
{
    id: string;
    url: string;
    filename: string;
    mimetype: string;
    encoding: string;
    size: number;
    relativePathSegments: string[];
}

export enum ImageFormat
{
    JPG = 'JPG',
    PNG = 'PNG',
    GIF = 'GIF',
    TIF = 'TIF',
    BMP = 'BMP',
}
