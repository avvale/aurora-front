export abstract class DownloadService
{
    abstract download(
        {
            relativePathSegments,
            filename,
            originFilename,
        }: {
            relativePathSegments: string[];
            filename: string;
            originFilename?: string;
        },
    ): void;
}
