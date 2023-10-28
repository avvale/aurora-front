export interface Attachment
{
    id: string;
    familyId: string;
    sort: number;
    alt: string;
    title: string;
    filename: string;
    mimetype: string;
    extension: string;
    relativePathSegments: string[];
    width: number;
    height: number;
    size: number;
    url: string;
    isCropable: boolean;
    isUploaded: boolean;
    isChanged: boolean;
    libraryId: string;
    libraryFilename: string;
    meta: any;
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

export enum ImageFormat
{
    JPG = 'JPG',
    PNG = 'PNG',
    GIF = 'GIF',
    TIF = 'TIF',
    BMP = 'BMP',
}
